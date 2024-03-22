/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-flow': 'auto 1fr',
        fill: 'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    base: false,
    themes: [
      {
        main: {
          primary: '#1d4ed8',
          secondary: '#374151',
          accent: '#6b7280',
          neutral: '#1f2937',
          'base-100': '#18181b',
          info: '#1e40af',
          success: '#65a30d',
          warning: '#d97706',
          error: '#be123c',
        },
      },
    ],
  },
};
