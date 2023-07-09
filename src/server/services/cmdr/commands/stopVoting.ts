import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "stopVoting",
	Aliases: ["spv"],
	Description: "Stops map vote, intended for testing",
	Group: "Admin",
	Args: [],
});
