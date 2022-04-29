module.exports = {
  important: true,
  future: {
    
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        danger: "#fcb00b",
        sky: "#43A6F7"
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
