import Roact from "@rbxts/roact"
import App from "./app"
import { Players } from "@rbxts/services"
import { Events } from "client/network"
import { Controller, OnStart } from "@flamework/core"
import { withHookDetection } from "@rbxts/roact-hooked"

@Controller()
export class Difficulty implements OnStart {
  onStart() {
    withHookDetection(Roact)

    Events.difficultyChange.connect((difficulty) => {
      const handle = Roact.mount(
        Roact.createElement("ScreenGui", {}, {
          Child: Roact.createElement(App, {
            difficulty: difficulty
          })
        }),
        Players.LocalPlayer.PlayerGui)

      task.wait(difficulty > 5 ? 15 : 7)
      Roact.unmount(handle)
    })
  }
}
