import { Players } from "@rbxts/services"
import { BaseComponent, Component } from "@flamework/components";
import { OnPhysics } from "@flamework/core";
import { CharacterRigR6 } from "@rbxts/promise-character";

interface ComponentInstance extends Part {}

const player = Players.LocalPlayer

@Component({
  tag: "semi-collide"
})
export class SemiCollide extends BaseComponent<{}, ComponentInstance> implements OnPhysics {
  onPhysics() {
    const character = player.Character as CharacterRigR6
    if (!character) return;
    const primaryPart = character.PrimaryPart
    
    if (!primaryPart) return;
    this.instance.CanCollide = (primaryPart.Position.Y > this.instance.Position.Y + 2)
  }
}
