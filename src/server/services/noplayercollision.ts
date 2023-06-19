import { Players, PhysicsService } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { CollisionGroup } from "shared/types/enums/collisiongroups";

@Service()
export class NoPlayerCollision implements OnStart {
	private changeGroup(part: Instance) {
		if (part.IsA("BasePart")) part.CollisionGroup = CollisionGroup.Players;
	}

	onStart() {
		PhysicsService.RegisterCollisionGroup(CollisionGroup.Players);
		PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Players, CollisionGroup.Players, false);

		Players.PlayerAdded.Connect((player) =>
			player.CharacterAdded.Connect((character) => {
				character.ChildAdded.Connect((child) => this.changeGroup(child));
				for (const object of character.GetChildren()) this.changeGroup(object);
			}),
		);
	}
}
