import { Debris } from "@rbxts/services";
import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface ComponentInstance extends Part {}
interface Attributes {
	damage: number;
	launchSpeed: number;
}

const VELOCITY_MARKER = "LavaVelocity";

@Component({
	tag: "lava",
	defaults: {
		damage: 20,
		launchSpeed: 100,
	},
})
export class Lava extends BaseComponent<Attributes, ComponentInstance> implements OnStart {
	debounces: Record<string, boolean> = {};

	onStart() {
		this.instance.Touched.Connect((touched) => {
			const character = touched.Parent;
			if (!character?.IsA("Model")) return;

			if (this.debounces[character.Name]) return;

			const humanoid = character.FindFirstChildOfClass("Humanoid");
			const torso = character.FindFirstChild("Torso");

			if (!humanoid || !torso) return;

			const velocity = new Instance("BodyVelocity");
			velocity.Name = VELOCITY_MARKER;
			velocity.MaxForce = Vector3.yAxis.mul(this.attributes.launchSpeed * 1000);
			velocity.Velocity = this.instance.CFrame.UpVector.mul(this.attributes.launchSpeed);
			velocity.Parent = torso;
			Debris.AddItem(velocity, 0.1);

			this.debounces[character.Name] = true;
			humanoid.TakeDamage(this.attributes.damage);
			task.wait(1);
			this.debounces[character.Name] = false;
		});
	}
}
