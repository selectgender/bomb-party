import { CommandArgument, CommandDefinition } from "@rbxts/cmdr"

export = identity<CommandDefinition>({
  Name: "stopBombRain",
  Aliases: ["sbr"],
  Description: "Stops bomb rain, intended for core gameplay",
  Group: "Admin",
  Args: []
})
