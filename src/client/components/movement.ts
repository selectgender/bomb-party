import { Workspace, ContextActionService, RunService } from "@rbxts/services";
import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";

interface Attributes {
	dashSpeed: number;
	walkSpeed: number;
	dashCooldown: number;
}

@Component({
	defaults: {
		dashSpeed: 24,
		walkSpeed: 24,
		dashCooldown: 0.25,
	},
	refreshAttributes: false,
})
export class Movement extends BaseComponent<Attributes, Model> implements OnStart {
	private mass = promiseR6(this.instance)
		.then((character) =>
			character
				.GetChildren()
				.filter((part): part is BasePart => part.IsA("BasePart"))
				.reduce((sum, part) => sum + part.GetMass(), 0),
		)
		.expect();

	private canDash = true;

	private async Dash() {
		if (!this.canDash) return;
		this.canDash = false;

		const character = await promiseR6(this.instance);
		const humanoid = character.Humanoid;
		const camera = Workspace.CurrentCamera;

		if (humanoid.Sit) {
			this.canDash = true;
			return;
		}
		if (!camera) {
			this.canDash = true;
			return;
		}

		const rootpart = character.HumanoidRootPart;

		humanoid.Sit = true;

		const [x, _y, _z] = camera.CFrame.ToOrientation();

		const rootpartPosition = rootpart.Position;
		const rp = rootpartPosition;

		const direction = CFrame.lookAt(rp, rp.add(humanoid.MoveDirection)).mul(CFrame.Angles(x, 0, 0)).LookVector;
		rootpart.ApplyImpulse(direction.mul(this.mass * this.attributes.dashSpeed));

		task.wait(this.attributes.dashCooldown);
		this.canDash = true;
	}

	async onStart() {
		const character = await promiseR6(this.instance);
		const humanoid = character.Humanoid;
		humanoid.WalkSpeed = this.attributes.walkSpeed;

		ContextActionService.BindAction("Dash", () => this.Dash(), true, Enum.KeyCode.E, Enum.KeyCode.ButtonB);
		ContextActionService.SetTitle("Dash", "Dash");
		ContextActionService.SetPosition("Dash", new UDim2(1, -70, 0, 10));
	}

	public Destroy() {
		ContextActionService.UnbindAction("Dash");
	}
}
