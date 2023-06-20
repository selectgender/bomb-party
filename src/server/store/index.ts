import Rodux from "@rbxts/rodux";
import { DeathsActions, deathsReducer, deathsState, DeathsState } from "./reducers/deaths";

export interface State {
	deaths: DeathsState;
}

export type Actions = DeathsActions;

const initialState = identity<State>({
	deaths: deathsState,
});

const reducer = Rodux.combineReducers({
	deaths: deathsReducer,
});

export default new Rodux.Store<State, Actions>(reducer, initialState);
