module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                "pale": {
                    "yellow": "#FFFFC9",
                },
                "washed": {
                    "green": "#9ECD9E",
                },
                "gold-fusion": "#767653",
                "jacko-bean": "#3E3E27"
            },
        },
        fontFamily: {
            'main': ["Source Sans Pro", 'Arial', 'sans-serif']
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}