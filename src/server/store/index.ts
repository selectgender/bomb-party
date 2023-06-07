import Rodux from "@rbxts/rodux"
import { BombRainActions, bombRainReducer, bombRainState, BombRainState } from "./reducers/bombrain"
import { DeathsActions, deathsReducer, deathsState, DeathsState } from "./reducers/deaths";
import { DifficultyActions, difficultyReducer, difficultyState, DifficultyState } from "./reducers/difficulty";
import { MapsActions, mapsReducer, mapsState, MapsState } from "./reducers/maps";
import { MusicActions, musicReducer, musicState, MusicState } from "./reducers/music";

export interface State {
  bombrain: BombRainState
  deaths: DeathsState
  difficulty: DifficultyState
  maps: MapsState
  music: MusicState
}

export type Actions = BombRainActions | DeathsActions | DifficultyActions | MapsActions | MusicActions

const initialState = identity<State>({
  bombrain: bombRainState,
  deaths: deathsState,
  difficulty: difficultyState,
  maps: mapsState,
  music: musicState
})

const reducer = Rodux.combineReducers({
  bombrain: bombRainReducer,
  deaths: deathsReducer,
  difficulty: difficultyReducer,
  maps: mapsReducer,
  music: musicReducer
})

export default new Rodux.Store<State, Actions>(reducer, initialState)
