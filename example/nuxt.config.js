export default {
  buildModules: ['@nuxtjs/composition-api'],
  modules: ['../src/module.ts'],
  sounds: [
    {
      name: 'back',
      src: '/back.wav'
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
