import { Players, PhysicsService } from "@rbxts/services"
import { OnStart, Service } from "@flamework/core";

@Service()
export class NoPlayerCollision implements OnStart {
  groupName = "PlayersGroup"

  private changeGroup(part: Instance) {
    if (part.IsA("BasePart")) part.CollisionGroup = this.groupName
  }

  onStart() {
    PhysicsService.RegisterCollisionGroup(this.groupName)
    PhysicsService.CollisionGroupSetCollidable(this.groupName, this.groupName, false)

    Players.PlayerAdded.Connect(player =>
      player.CharacterAdded.Connect(character => {
        character.ChildAdded.Connect((child) => this.changeGroup(child))
        for (const object of character.GetChildren()) this.changeGroup(object)
      }))
  }
}
