/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos principales - Paleta profesional
        'primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },

        // Colores de prioridad - Más sutiles y profesionales
        'priority-p1': '#dc2626', // Rojo crítico
        'priority-p2': '#f59e0b', // Ámbar prioritario
        'priority-p3': '#10b981', // Verde electivo
        'priority-p3-obs': '#6b7280', // Gris observado

        // Colores de SLA - Más discretos
        'sla-critical': '#dc2626',
        'sla-warning': '#f59e0b',
        'sla-ok': '#10b981',

        // Backgrounds y superficies
        'surface': {
          DEFAULT: '#ffffff',
          hover: '#f9fafb',
          active: '#f3f4f6',
        },
        'background': '#f8fafc',
      },
      borderRadius: {
        'lg': '0.75rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}