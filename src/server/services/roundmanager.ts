import { Players, Workspace } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import Signal from "@rbxts/signal";

import { BombRain } from "./bombrain";
import { Music } from "./music";
import { Border } from "./border";

import { maps } from "shared/types/constants/maps";
import store from "server/store";
import { promiseR6 } from "@rbxts/promise-character";

@Service()
export class RoundManager implements OnStart {
	automatic = true;
	alive: Player[] = [];
	endRound = new Signal();

	constructor(private bombRain: BombRain, private music: Music, private border: Border) {}
	onStart() {
		Workspace.lobby.reentry.reenterbutton.trigger.Touched.Connect((part) => {
			if (!part.Parent?.IsA("Model")) return;
			if (!part.Parent?.FindFirstChildOfClass("Humanoid")) return;
			this.teleportPlayer(part.Parent);
		});

		this.startLoop();
	}

	private startLoop() {
		while (this.automatic) {
			// will add intermission/voting eventually... but I AINT DOIN ALLAT RN
			this.intermission().expect();
			this.alive = Players.GetPlayers();
			Promise.race([this.startRound(), this.waitForDeaths(), this.prematureEndWait()]).expect();
			this.resetRound();
		}
	}

	// yes.. this is bad code
	// and yes... this is the only method that works
	// im so sorry
	private async startRound(): Promise<void> {
		return new Promise<void>((resolve, _, onCancel) => {
			onCancel(() => {
				this.resetRound();
			});

			const mapsNoNone = maps;
			maps.remove(maps.indexOf("none"));
			store.dispatch({ type: "setMap", map: maps[math.random(1, mapsNoNone.size() - 1)] });

			this.bombRain.setDifficulty(1);
			this.teleportAlive();
			this.bombRain.beginBombRain();

			resolve();
		})
			.andThenCall(Promise.delay, 20)
			.andThenCall(() => this.bombRain.setDifficulty(2))
			.andThenCall(Promise.delay, 20)
			.andThenCall(() => this.bombRain.setDifficulty(3))
			.andThenCall(Promise.delay, 20)
			.andThenCall(() => this.bombRain.setDifficulty(4))
			.andThenCall(Promise.delay, 20)
			.andThenCall(() => this.bombRain.setDifficulty(5))
			.andThenCall(Promise.delay, 20)
			.andThenCall(() => this.bombRain.setDifficulty(6))
			.andThenCall(Promise.delay, 20)
			.andThen(() => this.border.startBorder())
			.andThenCall(Promise.delay, 20)
			.andThen(() => this.border.stopBorder());
	}

	private async waitForDeaths(): Promise<void> {
		return new Promise((resolve, _, onCancel) => {
			const connections: RBXScriptConnection[] = [];

			onCancel(() => connections.forEach((connection) => connection.Disconnect()));

			this.alive.forEach(async (player) => {
				if (!player.Character) return;

				const character = await promiseR6(player.Character);
				connections.push(
					character.Humanoid.Died.Once(() => {
						this.alive.remove(this.alive.indexOf(player));
						if (this.alive.size() === 0) resolve();
					}),
				);
			});
		});
	}

	// arbitrarily waits a few seconds for now
	private async intermission(): Promise<void> {
		return new Promise((resolve) => {
			task.wait(10);
			resolve();
		});
	}

	private async prematureEndWait(): Promise<void> {
		return new Promise((resolve) => {
			this.endRound.Once(() => resolve());
		});
	}

	public resetRound() {
		this.endRound.Fire();
		this.border.stopBorder();
		this.bombRain.stopBombRain();
		store.dispatch({ type: "setMap", map: "none" });
		this.music.setLobbyMusic();
		store.dispatch({ type: "clearDeaths" });

		this.respawnAlive();
	}

	public startAutomatic() {
		if (this.automatic) return;
		this.resetRound();
		this.automatic = true;
		this.startLoop();
	}

	public pauseAutomatic() {
		if (!this.automatic) return;
		this.automatic = false;
		this.endRound.Fire();
	}

	public teleportPlayer = (character: Model) => character.PivotTo(new CFrame(Vector3.yAxis.mul(100)));

	// temporary command b4 I get my stuff together and make a list of alive ppl
	public teleportAlive() {
		this.alive.forEach((player) => {
			if (player.Character) this.teleportPlayer(player.Character);
		});
	}

	private respawnAlive = () => this.alive.forEach((player) => player.LoadCharacter());
}
