<template>
  <div @click="play">
    Works!
  </div>
</template>

<script>
import useSound from 'vue-use-sound'
import back from './back.wav'

export default {
  setup () {
    const [play] = useSound(back)

    return {
      play
    }
  }
}
</script>
