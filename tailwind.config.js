module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {},
        fontFamily: {
            'main': ["Source Sans Pro", 'Arial', 'sans-serif']
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}