/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['var(--font-display)', 'system-ui', 'sans-serif'],
				sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
			},
			colors: {
				cream: {
					DEFAULT: '#FAF7F1',
					100: '#FCFAF5',
					200: '#F1ECE1',
					300: '#E8E2D2'
				},
				mint: {
					DEFAULT: '#3BCE90',
					50: '#EFFFF8',
					100: '#D6F9E9',
					200: '#C5F3DE',
					400: '#5BD9A4',
					500: '#3BCE90',
					600: '#2BB87B',
					700: '#1F9866'
				},
				ink: {
					DEFAULT: '#0F1B14',
					50: '#F7FBF8',
					100: '#EEF6F1',
					200: '#D9E1DC',
					300: '#7A857F',
					400: '#4A5852',
					500: '#2D3933',
					900: '#0F1B14',
					950: '#08120D'
				}
			},
			boxShadow: {
				card: '0 1px 2px rgba(15,27,20,0.04), 0 10px 30px -12px rgba(15,27,20,0.16)',
				float: '0 2px 4px rgba(15,27,20,0.04), 0 28px 60px -18px rgba(15,27,20,0.32)'
			},
			borderRadius: {
				'4xl': '2rem',
				'5xl': '2.5rem'
			},
			animation: {
				'spin-slow': 'spin 24s linear infinite',
				float: 'float 7s ease-in-out infinite',
				marquee: 'marquee 36s linear infinite'
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				marquee: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
