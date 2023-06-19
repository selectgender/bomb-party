import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "enableAutomation",
	Aliases: ["ea"],
	Description: "Enables round automation, intended for core gameplay",
	Group: "Admin",
	Args: [],
});
