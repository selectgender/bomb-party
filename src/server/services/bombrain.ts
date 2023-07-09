import { Workspace, ServerStorage } from "@rbxts/services";
import { Service } from "@flamework/core";
import { Components } from "@flamework/components";
import { Bomb } from "server/components/bomb";
import { Music } from "./music";
import { Events } from "server/network";

@Service()
export class BombRain {
	// exists because you can disable the bombrain while its still disabled
	enabled = false;
	difficulty = 1;

	constructor(private components: Components, private music: Music) {}

	public async Drop(position: Vector3) {
		const part = ServerStorage.Assets.Bomb.Clone();
		part.Position = position;

		const bomb = this.components.addComponent<Bomb>(part);
		part.Parent = Workspace;

		task.wait(5);
		bomb.detonate();
	}

	public async beginBombRain() {
		if (this.enabled) return;
		this.enabled = true;

		while (this.enabled) {
			this.Drop(new Vector3(math.random(-98, 98), 90, math.random(-98, 98)));
			task.wait(1 / this.difficulty);
		}
	}

	public stopBombRain() {
		if (!this.enabled) return;
		this.enabled = false;
	}

	public async setDifficulty(difficulty: number) {
		this.difficulty = math.clamp(difficulty, 1, 6);
		this.music.setMusicDifficulty(math.clamp(difficulty, 1, 6));
		Events.difficultyChange.broadcast(difficulty);

		if (!this.enabled) return;
		this.stopBombRain();
		task.wait(1);
		this.beginBombRain();
	}
}
