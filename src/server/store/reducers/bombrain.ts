import Rodux from "@rbxts/rodux"

export interface BombRainState {
  enabled: boolean
}

export type BombRainActions =
  | {
    type: "enableBombRain"
  }
  | {
    type: "disableBombRain"
  }

export const bombRainState = {
  enabled: false
}

export const bombRainReducer = Rodux.createReducer<BombRainState, BombRainActions>(bombRainState, {
  enableBombRain: (state) => {
    return { ...state, enabled: true }
  },

  disableBombRain: (state) => {
    return { ...state, enabled: false }
  }
})
