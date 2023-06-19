import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "resetRound",
	Aliases: ["rr"],
	Description: "Basically a meta command that runs other commands to make your life easier, intended for core gameplay",
	Group: "Admin",
	Args: [],
});
