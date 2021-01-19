import { useSound } from '@vueuse/sound'
import options from './sounds'

export default ({app}, inject) => {
  const $sounds = {}

  app.setup = (_, ctx) => {
    for (const sound of Object.entries(options)) {
      $sounds[sound[0]] = useSound(sound[1].src, sound[1].options ? sound[1].options : {})
    }
  }

  inject('sounds', $sounds)
}
