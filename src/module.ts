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

export interface ModuleOptions {
  [K: string]: Sound
}

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = 'sounds'

const nuxtModule: Module<ModuleOptions> = function (sounds) {
  const options = defu<ModuleOptions>(this.options[CONFIG_KEY], sounds, DEFAULTS)

  this.addTemplate({
    fileName: 'sounds.js',
    src: resolve(__dirname, '../templates', 'options.js'),
    options
  })

  this.addPlugin({
    src: resolve(__dirname, '../templates', 'plugin.js'),
    fileName: 'nuxt-use-sound.js'
  })
};

(nuxtModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: ModuleOptions;
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: ModuleOptions;
  } // Nuxt 2.9 - 2.13
  interface Context {
    $sounds: {
      [K: string]: ExposedData
    };
  }
}

export default nuxtModule
