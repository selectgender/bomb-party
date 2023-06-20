import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { Option } from "@rbxts/rust-classes";
import { Maps } from "server/services/maps";
import { Music } from "server/services/music";

export = function (_: CommandContext, map: string) {
	const maps = Dependency<Maps>();

	if (map === "none") {
		maps.changeMap(Option.none());
		Dependency<Music>().setLobbyMusic();
		return;
	}

	const currentMap = maps.map;

	if (currentMap.isSome())
		if (currentMap.unwrap() === map) {
			maps.changeMap(Option.none());
			task.wait(0.1);
			maps.changeMap(Option.some(map));
			return;
		}

	maps.changeMap(Option.some(map));
};
