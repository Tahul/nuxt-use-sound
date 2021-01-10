export default {
  buildModules: ['@nuxtjs/composition-api'],
  modules: ['../src/module.ts'],
  plugins: [
    {
      src: '../templates/plugin.js',
      ssr: false
    }
  ],
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
