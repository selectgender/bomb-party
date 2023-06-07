import Rodux from "@rbxts/rodux"

const id = (numbers: string) => `rbxassetid://${numbers}` 

const difficultyMusicIds = [
  "1839389776",
  "1844928288",
  "1835376228",
  "1846560262",
  "7028518546",
  "1837301451",
]
const lobbyMusicId = "1844764917"

export interface MusicState {
  songId: string
}

export type MusicActions =
  | {
    type: "setMusicDifficulty",
    difficulty: number
  }
  | {
    type: "setLobbyMusic"
  }

export const musicState = identity<MusicState>({
  songId: id(lobbyMusicId)
})

export const musicReducer = Rodux.createReducer<MusicState, MusicActions>(musicState, {
  setMusicDifficulty: (state, actions) => {
    return { ...state, songId: id(difficultyMusicIds[actions.difficulty - 1]) }
  },
  setLobbyMusic: (state) => {
    return { ...state, songId: id(lobbyMusicId) }
  }
})
