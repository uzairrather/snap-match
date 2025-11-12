/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)", // gray-300
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // coral-500
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // coral-500
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // teal-400
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-400
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // yellow-300
          foreground: "var(--color-accent-foreground)", // gray-800
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // green-400
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // orange-400
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-400
          foreground: "var(--color-error-foreground)", // white
        },
        // Game-specific colors
        game: {
          surface: "var(--color-game-surface)", // white
          hover: "var(--color-game-hover)", // red-50
          active: "var(--color-game-active)", // red-100
          matched: "var(--color-game-matched)", // green-100
          shadow: "var(--color-game-shadow)", // shadow-sm
        },
        // Text colors
        text: {
          primary: "var(--color-text-primary)", // gray-800
          secondary: "var(--color-text-secondary)", // gray-500
        },
      },
      fontFamily: {
        'heading': ['Fredoka One', 'cursive'],
        'body': ['Nunito', 'sans-serif'],
        'caption': ['Nunito', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'game-title': ['2.5rem', { lineHeight: '1.2', fontWeight: '400' }],
        'game-button': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'game-card': ['0.875rem', { lineHeight: '1.3', fontWeight: '400' }],
      },
      borderRadius: {
        'game': '12px',
      },
      spacing: {
        'game-gap': '8px',
        'game-margin': '20px',
        'header-height': '80px',
      },
      animation: {
        'celebration-bounce': 'celebrationBounce 0.6s ease-out',
        'breathing-pulse': 'breathingPulse 2s ease-in-out infinite',
        'success-glow': 'successGlow 0.8s ease-out',
      },
      transitionTimingFunction: {
        'game-flip': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'game': '300ms',
        'feedback': '150ms',
      },
      zIndex: {
        'header': '100',
        'card': '10',
        'celebration': '200',
      },
      minHeight: {
        'touch-target': '60px',
      },
      minWidth: {
        'touch-target': '60px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}