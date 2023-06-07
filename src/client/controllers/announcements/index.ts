import Roact from "@rbxts/roact"
import App from "./app"
import { Players } from "@rbxts/services"
import { Events } from "client/network"
import { Controller, OnStart } from "@flamework/core"
import { withHookDetection } from "@rbxts/roact-hooked"

@Controller()
export class Announcements implements OnStart {
  onStart() {
    withHookDetection(Roact)

    Events.announcement.connect((text) => {
      const handle = Roact.mount(
        Roact.createElement("ScreenGui", {
          ResetOnSpawn: false,
          IgnoreGuiInset: true,
        }, {
          Child: Roact.createElement(App, {
            text: text
          })
        }),
        Players.LocalPlayer.PlayerGui)

      task.wait(10)
      Roact.unmount(handle)
    })
  }
}
