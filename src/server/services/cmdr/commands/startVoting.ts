import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "startVoting",
	Aliases: ["stv"],
	Description: "Starts map vote, intended for testing",
	Group: "Admin",
	Args: [],
});
