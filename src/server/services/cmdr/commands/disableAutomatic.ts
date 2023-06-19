import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "disableAutomation",
	Aliases: ["da"],
	Description: "Disables round automation, intended for core gameplay",
	Group: "Admin",
	Args: [],
});
