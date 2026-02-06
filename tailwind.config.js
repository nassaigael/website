/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Conversion des couleurs hex en RGB
                primary: {
                    DEFAULT: 'rgb(238, 82, 83)', // #ee5253
                    light: 'rgb(241, 113, 114)',
                    dark: 'rgb(190, 66, 67)',
                },
                secondary: 'rgb(255, 255, 255)', // #ffffff
                tertiary: 'rgb(0, 0, 0)',        // #000000

                // Ou avec la syntaxe CSS variable
                'custom-primary': 'rgb(var(--color-primary))',
                'custom-secondary': 'rgb(var(--color-secondary))',
                'custom-tertiary': 'rgb(var(--color-tertiary))',
                'custom-text': 'rgb(var(--color-text))',
                'custom-background': 'rgb(var(--color-background))',

                // Les couleurs d'état
                success: 'rgb(var(--color-success))',
                warning: 'rgb(var(--color-warning))',
                error: 'rgb(var(--color-error))',
                info: 'rgb(var(--color-info))',
                'surface-light': 'rgb(var(--color-surface-light))',
                'surface-dark': 'rgb(var(--color-surface-dark))',
                border: 'rgb(var(--color-border))',
            },
            fontFamily: {
                sans: 'var(--font-family-sans)',
                serif: 'var(--font-family-serif)',
                mono: 'var(--font-family-mono)',
                malagasy: 'var(--font-family-malagasy)',
            },
            fontSize: {
                'xs': 'var(--font-size-xs)',
                'sm': 'var(--font-size-sm)',
                'base': 'var(--font-size-base)',
                'lg': 'var(--font-size-lg)',
                'xl': 'var(--font-size-xl)',
                '2xl': 'var(--font-size-2xl)',
                '3xl': 'var(--font-size-3xl)',
                '4xl': 'var(--font-size-4xl)',
                '5xl': 'var(--font-size-5xl)',
                '6xl': 'var(--font-size-6xl)',
                '7xl': 'var(--font-size-7xl)',
            },
            fontWeight: {
                light: 'var(--font-weight-light)',
                normal: 'var(--font-weight-normal)',
                medium: 'var(--font-weight-medium)',
                semibold: 'var(--font-weight-semibold)',
                bold: 'var(--font-weight-bold)',
                extrabold: 'var(--font-weight-extrabold)',
            },
        },
    },
    plugins: [],
}