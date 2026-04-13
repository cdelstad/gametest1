import { Engine, Sound } from 'excalibur'

class AudioManager {
  currentSong: Sound | null = null
  engine!: Engine

  init(engine: Engine) {
    this.engine = engine
  }

  playSong(song: Sound) {
    if (this.currentSong) {
      this.currentSong.stop()
    }

    this.currentSong = song
    this.currentSong.play()
    this.currentSong.loop = true
  }

  playSfx(
    sfx: Sound,
    opts: { volume?: number; ignoreIfPlaying?: boolean } = {}
  ) {
    const { volume = 0.7, ignoreIfPlaying = false } = opts

    if (ignoreIfPlaying || !sfx.isPlaying()) {
      sfx.play(volume)
    }
  }
}

// make sure to call audioManager.init(engine) in your main file
export const audioManager = new AudioManager()