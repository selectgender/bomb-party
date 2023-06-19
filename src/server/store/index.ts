import Rodux from "@rbxts/rodux";
import { DeathsActions, deathsReducer, deathsState, DeathsState } from "./reducers/deaths";
import { MapsActions, mapsReducer, mapsState, MapsState } from "./reducers/maps";

export interface State {
	deaths: DeathsState;
	maps: MapsState;
}

export type Actions = DeathsActions | MapsActions;

const initialState = identity<State>({
	deaths: deathsState,
	maps: mapsState,
});

const reducer = Rodux.combineReducers({
	deaths: deathsReducer,
	maps: mapsReducer,
});

export default new Rodux.Store<State, Actions>(reducer, initialState);
