import { OnStart, Service } from "@flamework/core";
import { Cmdr } from "@rbxts/cmdr"

@Service({
  loadOrder: 0
})
export class CmdrServer implements OnStart {
  onStart() {
    Cmdr.RegisterDefaultCommands()
    Cmdr.RegisterCommandsIn(<Folder>script.FindFirstChild("commands"))
    Cmdr.RegisterTypesIn(<Folder>script.FindFirstChild("types"))
    Cmdr.RegisterHooksIn(<Folder>script.FindFirstChild("hooks"))
  }
}
