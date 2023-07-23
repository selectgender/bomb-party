import { Players, Workspace } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import Signal from "@rbxts/signal";

import { BombRain } from "./bombrain";
import { Music } from "./music";
import { Border } from "./border";
import { Maps } from "./maps";
import { Voting } from "./voting";

import store from "server/store";
import { promiseR6 } from "@rbxts/promise-character";
import { Option } from "@rbxts/rust-classes";
import options from "server/settings";
import { Events } from "server/network";

@Service()
export class RoundManager implements OnStart {
	automatic = !options.DEBUG_MODE;
	interval = options.change_interval;
	alive: Player[] = [];
	endRound = new Signal();

	constructor(
		private bombRain: BombRain,
		private music: Music,
		private border: Border,
		private maps: Maps,
		private voting: Voting,
	) {}
	onStart() {
		Workspace.lobby.reentry.reenterbutton.trigger.Touched.Connect((part) => {
			if (!part.Parent?.IsA("Model")) return;
			if (!part.Parent?.FindFirstChildOfClass("Humanoid")) return;
			this.teleportPlayer(part.Parent);
		});

		this.startLoop();
	}

	private startLoop() {
		if (options.DEBUG_MODE)
			warn(
				"DEBUG MODE IS ENABLED!!!! NO AUTOMATION AND SOME WEIRD STUFF HAPPEN, IF YOU WANT NORMAL STUFF JUST CHANGE IT IN server/settings",
			);
		while (this.automatic) {
			Promise.race([
				this.intermission()
					.andThen(() => (this.alive = Players.GetPlayers()))
					.andThen(() => {
						// maybe find alternative method?
						Promise.race([this.startRound(), this.waitForDeaths(), this.prematureEndWait()]).expect();
					})
					.andThen(() => this.resetRound()),
				this.prematureEndWait(),
			]).await();
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

			this.bombRain.setDifficulty(1);
			this.teleportAlive();
			this.bombRain.beginBombRain();

			resolve();
		}).andThen(() => {
			Promise.each([2, 3, 4, 5, 6], (value, _index) => {
				this.bombRain.setDifficulty(value);
				Events.updateStatus.broadcast(`difficulty ${value}`, this.interval);
				return Promise.delay(this.interval);
			}).await();
		});
	}

	private async waitForDeaths(): Promise<void> {
		return new Promise((resolve, _, onCancel) => {
			const connections: RBXScriptConnection[] = [];
			onCancel(() => connections.forEach((connection) => connection.Disconnect()));

			const remove = (player: Player) => {
				this.alive.remove(this.alive.indexOf(player));
				if (this.alive.size() === 0) resolve();
			};

			connections.push(Players.PlayerRemoving.Connect((player) => remove(player)));
			this.alive.forEach(async (player) => {
				if (!player.Character) return;

				const character = await promiseR6(player.Character);
				connections.push(character.Humanoid.Died.Once(() => remove(player)));
			});
		});
	}

	// arbitrarily waits a few seconds for now
	private async intermission(): Promise<void> {
		return new Promise((resolve) => {
			this.voting.StartVoting();
			Events.updateStatus.broadcast("intermission", options.intermission_length);
			task.wait(options.intermission_length);
			this.maps.changeMap(Option.some(this.voting.StopVotingAndReturnResult()));
			resolve();
		});
	}

	private async prematureEndWait(): Promise<void> {
		return new Promise((resolve) => {
			this.endRound.Once(() => {
				resolve();
			});
		});
	}

	public resetRound() {
		this.endRound.Fire();
		this.border.stopBorder();
		this.bombRain.stopBombRain();
		this.maps.changeMap(Option.none());
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
			if (player.Character) {
				player.LoadCharacter();
				task.wait(1);
				this.teleportPlayer(player.Character);
			}
		});
	}

	public teleportAll() {
		Players.GetPlayers().forEach((player) => {
			if (player.Character) this.teleportPlayer(player.Character);
		});
	}

	private respawnAlive = () =>
		this.alive.forEach((player) => {
			if (!player.Character) return;
			player.LoadCharacter();
		});
}
