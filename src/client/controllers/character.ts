import { Players } from "@rbxts/services"
import { Components } from "@flamework/components";
import { Controller, Dependency, OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character"
import { Movement } from "client/components/movement";

const player = Players.LocalPlayer

@Controller()
export class Character implements OnStart {
  components = Dependency<Components>()

  onStart() {
    const initializePlatforming = (character: Model) => {
			const platforming = this.components.addComponent<Movement>(character);

			promiseR6(character).then((model) => {
				model.Humanoid.Died.Connect(() => {
					platforming.Destroy();
					this.components.removeComponent<Movement>(character);
				});
			});
		};

		if (player.Character) initializePlatforming(player.Character);
		player.CharacterAdded.Connect(initializePlatforming);
  }
}
