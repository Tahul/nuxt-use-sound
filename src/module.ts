import { Module } from '@nuxt/types'
import defu from 'defu'
import { resolve } from 'path'
import {
  ComposableOptions,
  ExposedData
} from 'vue-use-sound/dist/esm/src/types'

export type Sound = {
  src: string;
  options: ComposableOptions;
};

const DEFAULTS: Sound[] = []

const CONFIG_KEY = 'sounds'

const nuxtModule: Module<Sound[]> = function (sounds) {
  const options = defu<Sound[]>(this.options[CONFIG_KEY], sounds, DEFAULTS)

  this.addTemplate({
    fileName: 'nuxt-use-sound/options.js',
    src: resolve(__dirname, '../templates', 'options.js'),
    options
  })

  this.addPlugin({
    src: resolve(__dirname, '../templates', 'plugin.js'),
    fileName: 'nuxt-use-sound/plugin.js'
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
  interface Context {
    $sounds: ExposedData[];
  }
}

export default nuxtModule
