import { CommandContext } from "@rbxts/cmdr"
import store from "server/store"

export = function(_: CommandContext, map: string) {
  if (map === "none") {
    store.dispatch({ type: "setMap", map: "none" })
    store.dispatch({ type: "setLobbyMusic" })
    return
  }

  const currentMap = store.getState().maps.map

  if (currentMap === map) {
    store.dispatch({ type: "setMap", map: "none" })
    task.wait(0.1)
    store.dispatch({ type: "setMap", map: map })
    return
  }

  store.dispatch({ type: "setMap", map: map })
}
