import postcss from 'postcss';

export default {
    plugins: [
        require('autoprefixer'),
        require('tailwindcss')
    ]
};