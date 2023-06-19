import { CommandArgument, CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "setDifficulty",
	Aliases: ["sd"],
	Description: "Sets the difficulty of the game, meant for core gameplay",
	Group: "Admin",
	Args: [
		{
			Type: "number",
			Name: "difficulty",
			Description: "The difficulty number",
		},
	],
});
