 const tailwindcss = require('tailwindcss');

module.exports = config => {
  require('react-app-rewire-postcss')(config, {
     plugins: loader => [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ]
  });
  return config;
};