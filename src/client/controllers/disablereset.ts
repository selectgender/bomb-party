// exists because in case this player is competing and presses reset I dont want them to be eliminated bc of that
// the only reason for dying should be bombs or lava

import { Controller, OnStart } from "@flamework/core"
import { StarterGui, RunService } from "@rbxts/services"

@Controller()
export class DisableReset implements OnStart {
  onStart() { 
    let result = []
    for (let retries = 0; retries < 8; retries++) {
      result = pcall(() => StarterGui.SetCore("ResetButtonCallback", false))
      if (result[1]) break;
      RunService.Stepped.Wait()
    }
  }
}
