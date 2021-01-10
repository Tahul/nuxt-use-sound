import { Module } from '@nuxt/types'
import defu from 'defu'
// eslint-disable-next-line import/order
import { resolve } from 'path'
import { ComposableOptions } from 'vue-use-sound/dist/esm/src/types'

export type Sound = {
  src: string
  options: ComposableOptions
}

const DEFAULTS: Sound[] = []
const CONFIG_KEY = 'sounds'

const nuxtModule: Module<Sound[]> = /* async */ function (moduleOptions) {
  const options = defu<Sound[]>(
    this.options[CONFIG_KEY],
    moduleOptions,
    DEFAULTS
  )

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'nuxtUseSound.js',
    options
  })
};

(nuxtModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: Sound[];
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: Sound[];
  } // Nuxt 2.9 - 2.13
}

export default nuxtModule
