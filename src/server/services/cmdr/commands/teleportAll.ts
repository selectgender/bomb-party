import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "teleportAll",
	Aliases: ["ta"],
	Description: "Teleports everyone into the arena, intended for core gameplay",
	Group: "Admin",
	Args: [],
});
