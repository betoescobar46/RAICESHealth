/**
 * IdleTimeoutContext
 *
 * Detecta inactividad del usuario y muestra aviso antes de logout automatico.
 * - 5 min inactividad: muestra modal de aviso
 * - 2 min countdown: tiempo para responder
 * - Si no responde: logout automatico
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface IdleTimeoutContextType {
  isIdle: boolean;
  remainingTime: number;
  resetIdleTimer: () => void;
}

const IdleTimeoutContext = createContext<IdleTimeoutContextType | undefined>(undefined);

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutos en ms
const COUNTDOWN_DURATION = 2 * 60; // 2 minutos en segundos

interface IdleTimeoutProviderProps {
  children: ReactNode;
}

export const IdleTimeoutProvider: React.FC<IdleTimeoutProviderProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isIdle, setIsIdle] = useState(false);
  const [remainingTime, setRemainingTime] = useState(COUNTDOWN_DURATION);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (idleTimer) clearTimeout(idleTimer);
    if (countdownTimer) clearInterval(countdownTimer);
  }, [idleTimer, countdownTimer]);

  const resetIdleTimer = useCallback(() => {
    clearTimers();
    setIsIdle(false);
    setRemainingTime(COUNTDOWN_DURATION);

    if (!isAuthenticated) return;

    const timer = setTimeout(() => {
      setIsIdle(true);
      // Iniciar countdown
      const countdown = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setCountdownTimer(countdown);
    }, IDLE_TIMEOUT);

    setIdleTimer(timer);
  }, [isAuthenticated, logout, clearTimers]);

  // Eventos que resetean el timer de inactividad
  useEffect(() => {
    if (!isAuthenticated) {
      clearTimers();
      return;
    }

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      if (!isIdle) {
        resetIdleTimer();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Iniciar timer al montar
    resetIdleTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearTimers();
    };
  }, [isAuthenticated, isIdle, resetIdleTimer, clearTimers]);

  const handleContinueSession = () => {
    resetIdleTimer();
  };

  const value: IdleTimeoutContextType = {
    isIdle,
    remainingTime,
    resetIdleTimer: handleContinueSession
  };

  return (
    <IdleTimeoutContext.Provider value={value}>
      {children}

      {/* Modal de Timeout */}
      {isIdle && isAuthenticated && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <div className="bg-slate-800 border border-slate-600 p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Sesion inactiva
            </h3>

            <p className="text-slate-300 mb-4">
              Tu sesion se cerrara automaticamente por inactividad.
            </p>

            <div className="text-4xl font-bold text-orange-400 mb-6">
              {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleContinueSession}
                className="flex-1 bg-gradient-to-r from-[#c2703a] to-[#d97b3a] text-white py-3 px-6 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30"
              >
                Continuar sesion
              </button>
              <button
                onClick={logout}
                className="flex-1 bg-slate-700 text-slate-300 py-3 px-6 rounded-xl font-semibold transition-all hover:bg-slate-600"
              >
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      )}
    </IdleTimeoutContext.Provider>
  );
};

export const useIdleTimeout = (): IdleTimeoutContextType => {
  const context = useContext(IdleTimeoutContext);
  if (!context) {
    throw new Error('useIdleTimeout must be used within IdleTimeoutProvider');
  }
  return context;
};
