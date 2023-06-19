import { TweenService, Workspace, PhysicsService } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { CollisionGroup } from "shared/types/enums/collisiongroups";

@Service()
export class Border implements OnStart {
	running = false;
	instances: Part[] = [];
	distance = 80;
	// + 0.5 added because I added 0.5 to the border position to avoid zfighting and yeah I have to offset that
	public duration = 150 + 0.5; // in seconds

	onStart() {
		PhysicsService.RegisterCollisionGroup(CollisionGroup.Border);
	}

	private applyProperties(part: Part) {
		part.Material = Enum.Material.Neon;
		part.Color = Color3.fromRGB(111, 18, 165);
		part.Transparency = 0.7;
		part.Anchored = true;
		// 0.01 added to fix zfighting on intersections :sob:
		part.Size = new Vector3(200 + 0.01, 100, 1);
		part.CastShadow = false;
		part.Name = "border";
		part.CollisionGroup = CollisionGroup.Border;
		PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Players, CollisionGroup.Border, true);
		PhysicsService.CollisionGroupSetCollidable(CollisionGroup.Border, CollisionGroup.Default, false);
	}

	public startBorder() {
		if (this.running) return;
		this.running = true;

		const border1 = new Instance("Part");
		const border2 = new Instance("Part");
		const border3 = new Instance("Part");
		const border4 = new Instance("Part");

		border1.Position = new Vector3(0, 51, -100);
		border1.Orientation = Vector3.yAxis.mul(180);

		border2.Position = new Vector3(-100, 51, 0);
		border2.Orientation = Vector3.yAxis.mul(-90);

		border3.Position = new Vector3(0, 51, 100);
		border3.Orientation = Vector3.yAxis.mul(0);

		border4.Position = new Vector3(100, 51, 0);
		border4.Orientation = Vector3.yAxis.mul(90);

		this.instances.push(border1);
		this.instances.push(border2);
		this.instances.push(border3);
		this.instances.push(border4);

		this.instances.forEach((part) => {
			this.applyProperties(part);
			// parents to lobby bc its blacklisted frmo explosions
			part.Parent = Workspace.lobby;

			TweenService.Create(part, new TweenInfo(this.duration), {
				Size: new Vector3(200, 100, this.distance),
				Position: part.Position.add(part.CFrame.LookVector.mul(this.distance / 2)),
			}).Play();
		});
	}

	public stopBorder() {
		if (!this.running) return;
		this.running = false;

		this.instances.forEach((part) => part.Destroy());
		this.instances.clear();
	}
}
