import { Workspace, ServerStorage } from "@rbxts/services"
import { OnStart, Service, Dependency } from "@flamework/core"
import { Components } from "@flamework/components";
import { Bomb } from "server/components/bomb";

import store from "server/store"

@Service()
export class BombRain implements OnStart {
  // exists because there isnt really an elegant way to intertwine this toggle with the subscribe method
  // also because you can disable the bombrain while its still disabled
  enabled = false
  components = Dependency<Components>()

  // public because cmdr uses it too
  public async Drop(position: Vector3) {
    const part = ServerStorage.Assets.Bomb.Clone()
    part.Position = position
    
    const bomb = this.components.addComponent<Bomb>(part)
    part.Parent = Workspace

    task.wait(5)
    bomb.detonate()
  }

  private async beginBombRain() {
    if (this.enabled) return;
    this.enabled = true

    const difficulty = store.getState().difficulty.difficulty

    while (this.enabled) {
      this.Drop(new Vector3(math.random(-98, 98), 90, math.random(-98, 98)))
      task.wait(1/difficulty)
    }
  }

  private async stopBombRain() {
    if (!this.enabled) return;
    this.enabled = false
  }

  onStart() {
    store.changed.connect((newState, oldState) => {
      if (newState.bombrain.enabled === oldState.bombrain.enabled) return
      newState.bombrain.enabled ? this.beginBombRain() : this.stopBombRain()
    })
  }
}
