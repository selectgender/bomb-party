import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "clearDeaths",
	Aliases: ["cd"],
	Description: "Clears all deaths for the deathboard, intended for core gameplay",
	Group: "Admin",
	Args: [],
});
