import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core"

interface ComponentInstance extends Part {}
interface Attributes {
  damage: number
}

@Component({
  tag: "lava",
  defaults: {
    damage: 20
  }
})
export class Lava extends BaseComponent<Attributes, ComponentInstance> implements OnStart {
  debounces: Record<string, boolean> = {}

  onStart() {
    this.instance.Touched.Connect(touched => {
      const character = touched.Parent
      if (!character?.IsA(("Model"))) return;

      const humanoid = character?.FindFirstChildOfClass("Humanoid")

      if (!humanoid) return;
      if (this.debounces[character.Name]) return;

      this.debounces[character.Name] = true
      humanoid.TakeDamage(20)
      task.wait(1)
      this.debounces[character.Name] = false
    })
  }
}
