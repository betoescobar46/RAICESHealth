import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { ChangePasswordResult } from '../App';
import { getBrandingConfig } from '../config/branding.config';

interface LoginPageProps {
    LogoComponent: React.FC<{ version?: string, className?: string }>;
    onChangePassword: (rut: string, oldPass: string, newPass: string) => ChangePasswordResult;
    onNotifyAdmin: (rut: string) => void;
}

// --- Funciones de validación y formato de RUT (sin cambios) ---
const validateRut = (rut: string): boolean => {
    // RUTs de prueba/admin permitidos sin validación
    if (rut === '1234-4' || rut === '1234-5' || rut === '99999999-9') return true;

    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (cleanRut.length < 2) return false;
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= body.length; i++) {
        suma += parseInt(body.charAt(body.length - i), 10) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = (11 - (suma % 11)).toString();
    if (dvEsperado === '11') return dv === '0';
    if (dvEsperado === '10') return dv === 'K';
    return dv === dvEsperado;
};

const formatRut = (value: string): string => {
    const cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (cleanValue.length === 0) return '';

    // Si es muy corto, simplemente devolver lo que hay
    if (cleanValue.length === 1) return cleanValue;

    const body = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);

    // Formatear con puntos y guión: 12.345.678-9
    let formattedBody = body;
    if (body.length > 3) {
        formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return `${formattedBody}-${dv}`;
};
// --- Fin de funciones de RUT ---

const LoginPage: React.FC<LoginPageProps> = ({ LogoComponent, onChangePassword, onNotifyAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Estados para recuperación de contraseña
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoverySuccess, setRecoverySuccess] = useState(false);
    const [recoveryError, setRecoveryError] = useState<string | null>(null);
    const [recoveryLoading, setRecoveryLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            console.log('Intentando login con email:', email);

            // Autenticar con Firebase
            await signInWithEmailAndPassword(auth, email, password);

            // Login exitoso - Firebase manejará el estado de autenticación
            // App.tsx detectará el cambio vía onAuthStateChanged
            console.log('Login exitoso con Firebase Auth');

        } catch (error: any) {
            // Mapear errores de Firebase a mensajes en español
            console.error('Error de Firebase Auth:', error.code);

            if (error.code === 'auth/user-not-found') {
                setError('Usuario no encontrado. Verifica tu email.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Demasiados intentos fallidos. Intenta más tarde.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Email inválido.');
            } else if (error.code === 'auth/invalid-credential') {
                setError('Credenciales inválidas. Verifica tu email y contraseña.');
            } else {
                setError('Error al iniciar sesión. Intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordRecovery = async () => {
        setRecoveryError(null);
        setRecoverySuccess(false);
        setRecoveryLoading(true);

        try {
            console.log('Enviando email de recuperación a:', recoveryEmail);

            // Enviar email de recuperación con Firebase
            await sendPasswordResetEmail(auth, recoveryEmail);

            setRecoverySuccess(true);
            console.log('Email de recuperación enviado exitosamente');

        } catch (error: any) {
            console.error('Error al enviar email de recuperación:', error.code);

            if (error.code === 'auth/user-not-found') {
                setRecoveryError('No existe un usuario con este email.');
            } else if (error.code === 'auth/invalid-email') {
                setRecoveryError('El email ingresado no es válido.');
            } else if (error.code === 'auth/too-many-requests') {
                setRecoveryError('Demasiados intentos. Intenta más tarde.');
            } else {
                setRecoveryError('Error al enviar el email de recuperación. Intenta nuevamente.');
            }
        } finally {
            setRecoveryLoading(false);
        }
    };

    const openRecoveryModal = () => {
        // Pre-llenar con el email si existe
        setRecoveryEmail(email);
        setRecoverySuccess(false);
        setRecoveryError(null);
        setShowRecoveryModal(true);
    };

    const closeRecoveryModal = () => {
        setShowRecoveryModal(false);
        setRecoveryEmail('');
        setRecoverySuccess(false);
        setRecoveryError(null);
    };

    return (
        <main className="fixed inset-0 flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden" style={{ zoom: '120%' }}>
            {/* Circulos organicos animados con blur */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-orange-400/10 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
                <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-amber-500/15 blur-2xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
            </div>

            {/* Lineas decorativas sutiles */}
            <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,30 50,50 T100,50" stroke="#c2703a" strokeWidth="0.5" fill="none" />
                <path d="M0,60 Q25,40 50,60 T100,60" stroke="#d97b3a" strokeWidth="0.3" fill="none" />
                <path d="M0,40 Q25,20 50,40 T100,40" stroke="#c2703a" strokeWidth="0.3" fill="none" />
            </svg>

            {/* Card centrado con glassmorphism */}
            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <LogoComponent className="text-white" />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white">Bienvenido</h2>
                        <p className="text-white/60 mt-2 text-sm">Ingresa tus credenciales para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-white/70 ml-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200 text-white placeholder-white/40"
                                placeholder="usuario@email.com"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-white/70 ml-1">Contrasena</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all duration-200 text-white"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-xl text-sm animate-[fadeIn_0.3s_ease-out]">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#c2703a] to-[#d97b3a] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 mt-6"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Ingresando...
                                </span>
                            ) : 'Ingresar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={openRecoveryModal}
                            className="text-sm text-white/50 hover:text-orange-400 transition-colors duration-200 font-medium"
                        >
                            ¿Olvidaste tu contrasena?
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/40 text-xs mt-8">
                    {getBrandingConfig().footerText}
                </p>
            </div>

            {/* Modal de Recuperación de Contraseña */}
            {showRecoveryModal && (
                <div
                    className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 animate-[fadeIn_0.2s_ease-out]"
                    onClick={closeRecoveryModal}
                >
                    <div
                        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md mx-4 animate-[slideUp_0.3s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-semibold text-white mb-2">Recuperar Contrasena</h3>

                        {!recoverySuccess ? (
                            <>
                                <p className="text-white/60 text-sm mb-4">
                                    Ingresa tu email para recibir un enlace de recuperacion.
                                </p>
                                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-3 mb-6">
                                    <p className="text-blue-200 text-xs">
                                        <strong>Nota:</strong> Solo usuarios con email real pueden usar esta funcion.
                                        Si usas RUT para ingresar, contacta al administrador.
                                    </p>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="recoveryEmail" className="block mb-2 text-sm font-medium text-white/70">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="recoveryEmail"
                                        value={recoveryEmail}
                                        onChange={(e) => setRecoveryEmail(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all text-white placeholder-white/40"
                                        placeholder="usuario@email.com"
                                        disabled={recoveryLoading}
                                    />
                                </div>

                                {recoveryError && (
                                    <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl text-sm mb-4">
                                        {recoveryError}
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={handlePasswordRecovery}
                                        disabled={recoveryLoading || !recoveryEmail}
                                        className="flex-1 bg-gradient-to-r from-[#c2703a] to-[#d97b3a] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed"
                                    >
                                        {recoveryLoading ? 'Enviando...' : 'Enviar Email'}
                                    </button>
                                    <button
                                        onClick={closeRecoveryModal}
                                        disabled={recoveryLoading}
                                        className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold transition-all hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-green-500/20 border border-green-400/30 text-green-200 px-4 py-4 rounded-xl text-sm mb-4 flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Email de recuperacion enviado exitosamente a <strong>{recoveryEmail}</strong></span>
                                </div>
                                <p className="text-white/60 text-sm mb-6">
                                    Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contrasena.
                                </p>
                                <button
                                    onClick={closeRecoveryModal}
                                    className="w-full bg-gradient-to-r from-[#c2703a] to-[#d97b3a] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                                >
                                    Cerrar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* CSS para animaciones */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    );
};

export default LoginPage;
