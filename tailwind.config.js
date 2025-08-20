/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // Cores inspiradas em alimentos frescos
        'food-green': '#4CAF50',      // Verde folha
        'food-orange': '#FF9800',     // Laranja cenoura
        'food-red': '#FF5722',        // Vermelho tomate
        'food-yellow': '#FFC107',     // Amarelo milho
        'food-brown': '#8D6E63',      // Castanho canela
        
        // Paleta personalizada
        primary: {
          50: '#E8F5E8',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        secondary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        accent: {
          red: '#FF5722',
          yellow: '#FFC107',
          brown: '#8D6E63',
        }
      },
      backgroundImage: {
        'gradient-food': 'linear-gradient(135deg, #4CAF50, #FF9800)',
        'gradient-accent': 'linear-gradient(135deg, #FF5722, #FFC107)',
        'gradient-subtle': 'linear-gradient(135deg, #F5F5F5, #FFFFFF)',
      },
      boxShadow: {
        'food-light': '0 2px 8px rgba(0,0,0,0.1)',
        'food-medium': '0 4px 16px rgba(0,0,0,0.15)',
        'food-heavy': '0 8px 32px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease',
        'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-custom': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  // Configurações para otimização
  corePlugins: {
    preflight: true,
  },
  // Dark mode support
  darkMode: 'class',
}