import { CommandArgument, CommandDefinition } from "@rbxts/cmdr"

export = identity<CommandDefinition>({
  Name: "loadMap",
  Aliases: ["lm"],
  Description: "Loads a map, intended for core gameplay",
  Group: "Admin",
  Args: [
    {
      Type: "maps",
      Name: "map",
      Description: "The name of the map to load"
    }
  ]
})
