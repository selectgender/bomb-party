import Rodux from "@rbxts/rodux"

export interface DifficultyState {
  difficulty: number
}

export type DifficultyActions =
  | {
    type: "setDifficulty",
    difficulty: number
  }

export const difficultyState = identity<DifficultyState>({
  difficulty: 1
})

export const difficultyReducer = Rodux.createReducer<DifficultyState, DifficultyActions>(difficultyState, {
  setDifficulty: (state, action) => {
    return { ...state, difficulty: action.difficulty }
  }
})
