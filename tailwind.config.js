/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "Arial", "sans-serif"],
                serif: ["Georgia", "serif"],
                mono: ["Source Code Pro", "monospace"],
            },
        },
    },
    plugins: [],
};
