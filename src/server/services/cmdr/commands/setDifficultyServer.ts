import { CommandContext } from "@rbxts/cmdr"
import { Events } from "server/network"
import store from "server/store"

export = (_: CommandContext, difficulty: number) => {
  store.dispatch({ type: "setDifficulty", difficulty: math.clamp(difficulty, 1, 6) })
  store.dispatch({ type: "setMusicDifficulty", difficulty: math.clamp(difficulty, 1, 6) })
  Events.difficultyChange.broadcast(difficulty)
}
