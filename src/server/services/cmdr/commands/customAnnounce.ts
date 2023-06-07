import { CommandArgument, CommandDefinition } from "@rbxts/cmdr"

export = identity<CommandDefinition>({
  Name: "customAnnounce",
  Aliases: ["ca"],
  Description: "Makes a fancy GUI announcement to all clients, intended for core gameplay",
  Group: "Admin",
  Args: [
    {
      Type: "string",
      Name: "announcement",
      Description: "thing to announce"
    }
  ]
})
