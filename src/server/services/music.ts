import store from "server/store"
import { Workspace, TweenService } from "@rbxts/services"
import { OnStart, Service } from "@flamework/core"

@Service()
export class Music implements OnStart {
  transitionInfo = new TweenInfo(3)
  soundInstance;

  constructor() {
    this.soundInstance = new Instance("Sound")
    this.soundInstance.Looped = true
    this.soundInstance.Parent = Workspace
  }

  onStart() {
    store.changed.connect(async (state, prevState) => {
      if (state.music.songId === prevState.music.songId) return

      const oldInstance = this.soundInstance

      this.soundInstance = new Instance("Sound")
      this.soundInstance.Looped = true
      this.soundInstance.SoundId = state.music.songId
      this.soundInstance.Volume = 0
      this.soundInstance.Parent = Workspace
      this.soundInstance.Play()

      TweenService.Create(this.soundInstance, this.transitionInfo, { Volume: 0.5 }).Play()
      TweenService.Create(oldInstance, this.transitionInfo, { Volume: 0 }).Play()
      task.wait(this.transitionInfo.Time)
      oldInstance.Destroy()
    })

    this.soundInstance.SoundId = store.getState().music.songId
    this.soundInstance.Play()
  }
}
