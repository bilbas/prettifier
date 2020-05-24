// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%']
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
};