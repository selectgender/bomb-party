export type networkVotingActions =
    | {
        type: "displayVoted"
        option: number
    }
    | {
        type: "displayOption"
        option: number
        name: string
        image: number
    }
    | {
        type: "clearVisuals"
    }
    | {
        type: "setVoteCount"
        option: number
        votes: number
    }
