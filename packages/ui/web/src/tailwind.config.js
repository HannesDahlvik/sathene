const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['../../apps/**/*.{ts,tsx}', '../../packages/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                border: 'rgba(var(--border))',
                input: 'rgba(var(--input))',
                ring: 'rgba(var(--ring))',
                background: 'rgba(var(--background))',
                foreground: 'rgba(var(--foreground))',
                primary: {
                    DEFAULT: 'rgba(var(--primary))',
                    foreground: 'rgba(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'rgba(var(--secondary))',
                    foreground: 'rgba(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'rgba(var(--destructive))',
                    foreground: 'rgba(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'rgba(var(--muted))',
                    foreground: 'rgba(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'rgba(var(--accent))',
                    foreground: 'rgba(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'rgba(var(--popover))',
                    foreground: 'rgba(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'rgba(var(--card))',
                    foreground: 'rgba(var(--card-foreground))'
                }
            },
            borderRadius: {
                xl: 'calc(var(--radius) + 4px)',
                lg: 'calc(var(--radius) + 2px)',
                md: 'var(--radius)',
                sm: 'calc(var(--radius) - 2px)',
                xs: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                sans: ['var(--font)', ...fontFamily.sans]
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
}
