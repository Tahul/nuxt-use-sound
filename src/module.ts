import { Module } from '@nuxt/types'
import defu from 'defu'
// eslint-disable-next-line import/order
import { resolve } from 'path'
import { ComposableOptions, ExposedData } from 'vue-use-sound/dist/esm/src/types'

export type Sound = {
  src: string
  options: ComposableOptions
}

export interface ModuleOptions {
  references: Sound[]
}

const DEFAULTS: ModuleOptions = {
  references: []
}

const CONFIG_KEY = 'sounds'

const nuxtModule: Module<ModuleOptions> = /* async */ function (moduleOptions) {
  const options = defu<Sound[]>(
    this.options[CONFIG_KEY],
    moduleOptions,
    DEFAULTS
  )

  this.addTemplate({
    fileName: 'sounds/options.js',
    src: resolve(__dirname, '../templates', 'options.js'),
    options
  })

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'nuxt-use-sound.js'
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
    $sounds: ExposedData[]
  }
}

export default nuxtModule
