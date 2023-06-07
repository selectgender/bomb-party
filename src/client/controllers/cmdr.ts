import { Controller, OnStart } from "@flamework/core";
import { CmdrClient } from "@rbxts/cmdr";

@Controller()
export class Cmdr implements OnStart {
  onStart() {
    CmdrClient.SetActivationKeys([Enum.KeyCode.F2])
  }
}
