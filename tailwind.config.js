/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'dark-black': '#000',
				'dark-gray': '#494554',
				'light-gray': '#686473',
			},
			fontFamily: {
				hahmlet: ['var(--font-hahmlet)'],
				rubik: ['var(--font-rubik)'],
			},
		},
	},
	plugins: [],
};
