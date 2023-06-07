import Rodux from "@rbxts/rodux"
import { Vec } from "@rbxts/rust-classes"

export interface DeathsState {
  deaths: Vec<Player>
}

export type DeathsActions =
  | {
    type: "addDeath",
    player: Player
  }
  | {
    type: "clearDeaths"
  }

export const deathsState = identity<DeathsState>({
  deaths: Vec.vec<Player>()
})

export const deathsReducer = Rodux.createReducer<DeathsState, DeathsActions>(deathsState, {
  addDeath: (state, action) => {
    return { ...state, deaths: state.deaths.push(action.player) }
  },
  clearDeaths: (state) => {
    return { ...state, deaths: state.deaths.clear() }
  }
})
