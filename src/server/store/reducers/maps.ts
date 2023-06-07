import Rodux from "@rbxts/rodux"

export interface MapsState {
  map: string
}

export type MapsActions =
  | {
    type: "setMap",
    map: string
  }

export const mapsState = identity<MapsState>({
  map: "none"
})

export const mapsReducer = Rodux.createReducer<MapsState, MapsActions>(mapsState, {
  setMap: (state, action) => {
    return { ...state, map: action.map }
  }
})
