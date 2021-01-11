import useSound from 'vue-use-sound'
import options from './sounds'

export default ({app}, inject) => {
  const $sounds = {}

  app.setup = (_, ctx) => {
    for (const sound of Object.entries(options)) {
      const [play, options] = useSound(sound[1].src, sound[1].options ? sound[1].options : {})

      $sounds[sound[0]] = {
        ...options,
        play
      }
    }
  }

  inject('sounds', $sounds)
}
