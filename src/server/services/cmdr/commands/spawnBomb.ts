import { CommandArgument, CommandDefinition } from "@rbxts/cmdr"

export = identity<CommandDefinition>({
  Name: "spawnBomb",
  Aliases: ["sb"],
  Description: "Spawns a bomb at the players position, intended for testing",
  Group: "Admin",
  Args: []
})
