import { Workspace, TweenService } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";

const id = (id: string) => `rbxassetid://${id}`;

const lobbyMusicId = "1844764917";
const difficultyMusicIds = ["1839389776", "1844928288", "1835376228", "1846560262", "7028518546", "1837301451"];

@Service()
export class Music implements OnStart {
	transitionInfo = new TweenInfo(3);
	songId = id(lobbyMusicId);
	soundInstance;

	constructor() {
		this.soundInstance = new Instance("Sound");
		this.soundInstance.Looped = true;
		this.soundInstance.Parent = Workspace;
	}

	private async changeMusicId(song: string) {
		const oldInstance = this.soundInstance;

		const newSound = new Instance("Sound");
		newSound.Looped = true;
		newSound.SoundId = id(song);
		newSound.Volume = 0;
		newSound.Parent = Workspace;
		newSound.Play();
		this.soundInstance = newSound;

		TweenService.Create(newSound, this.transitionInfo, { Volume: 0.5 }).Play();
		TweenService.Create(oldInstance, this.transitionInfo, { Volume: 0 }).Play();
		task.wait(this.transitionInfo.Time);
		oldInstance.Destroy();
	}

	public setMusicDifficulty = (difficulty: number) => this.changeMusicId(difficultyMusicIds[difficulty - 1]);
	public setLobbyMusic = () => this.changeMusicId(lobbyMusicId);

	onStart() {
		this.soundInstance.SoundId = this.songId;
		this.soundInstance.Play();
	}
}
