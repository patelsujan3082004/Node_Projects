/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#f5fbff',
          100: '#eef8ff',
          200: '#d6f0ff',
          300: '#aee0ff',
          400: '#7ac9ff',
          500: '#3fb0ff',
          600: '#218ed6',
          700: '#17658f',
          800: '#114f6f',
          900: '#0b394f',
        },
        accent: {
          50: '#fff8f5',
          100: '#fff0ec',
          200: '#ffd9cc',
          300: '#ffb399',
          400: '#ff8a66',
          500: '#ff5f33',
          600: '#d9461b',
          700: '#973014',
          800: '#6b230f',
          900: '#45180a',
        },
        muted: {
          DEFAULT: '#6b7280',
          700: '#4b5563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
      },
      boxShadow: {
        'soft-lg': '0 20px 40px rgba(2,6,23,0.08)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

