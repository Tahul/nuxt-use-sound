# 🔊 nuxt-use-sound

This module is a **Nuxt** implementation of the Vue composable [**@vueuse/sound**](https://github.com/vueuse/sound).

For a better **understanding** of this **module**, you should check out the original [**composable page**](https://github.com/vueuse/sound).

## Setup

In order to use this module, you must have [@nuxt/composition-api](https://composition-api.nuxtjs.org) setup in your project.

Once you installed it, add `nuxt-use-sound` dependency to your project

```bash
yarn add --dev nuxt-use-sound
# or
npm i -D nuxt-use-sound
```

Add `nuxt-use-sound` to the `modules` section of `nuxt.config.js`

```js
// nuxt.config.js
{
  buildModules: ['nuxt-use-sound']
}
```

Configure your sounds 🥁

```js
// nuxt.config.js
{
  sound: {
    back: {
      src: "/back.wav",
      options: {
        volume: 0.25
      }
    }
  }
}
```

The rest of the documentation is available on the [**original composable repository**](https://github.com/vueuse/sound).

## Usage

Play your sounds, anywhere in your app.

Just note that no sound can be played before the user has clicked the page, this is a limitation from the [**Web Audio API**](https://developer.mozilla.org/fr/docs/Web/API/Web_Audio_API).

```vue
<template>
  <button @click="$sounds.back.play">
    Boop! 🎺
  </button>
</template>
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

## License

[MIT License](./LICENSE)

## Credits

This package comes from [**@vueuse/sound**](https://github.com/vueuse/sound), a package inspired by the React hook, [**useSound**](https://github.com/joshwcomeau/use-sound).

All the credit behind this idea goes to [**Josh W. Comeau**](https://github.com/joshwcomeau).
