import type { Module } from '@nuxt/types'
import type {
  ComposableOptions,
  ReturnedValue
} from '@vueuse/sound/dist/esm/src/types'
import defu from 'defu'
import { resolve } from 'path'

export type Sound = {
  src: string
  options: ComposableOptions
}

export interface ModuleOptions {
  [K: string]: Sound
}

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = 'sound'

const nuxtModule: Module<ModuleOptions> = async function(moduleOptions) {
  const options: ModuleOptions = defu(
    this.options[CONFIG_KEY]!,
    moduleOptions,
    DEFAULTS
  )

  this.addTemplate({
    fileName: 'sound.config.js',
    src: resolve(__dirname, '../templates', 'sound.config.js')
  })

  this.addPlugin({
    src: resolve(__dirname, '../templates', 'sound.js'),
    fileName: 'sound.js',
    options
  })

  this.nuxt.options.build.transpile.push('defu')

  await this.addModule('@nuxtjs/composition-api/module')
}

;(nuxtModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]?: ModuleOptions
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]?: ModuleOptions
  } // Nuxt 2.9 - 2.13
  interface Context {
    $sounds: {
      [K: string]: ReturnedValue
    }
  }
}

export default nuxtModule
