import { Engine, Sound } from 'excalibur'
import { Config } from '../config'

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
    const { volume = Config.DEFAULT_SFX_VOLUME, ignoreIfPlaying = false } = opts

    if (ignoreIfPlaying || !sfx.isPlaying()) {
      sfx.play(volume)
    }
  }
}

// make sure to call audioManager.init(engine) in your main file
export const audioManager = new AudioManager()