import { Workspace, Players } from "@rbxts/services"
import { Service } from "@flamework/core";
import { maps } from "shared/types/constants/maps";
import { Events } from "server/network";

const pads = Workspace.lobby.voting.pads

@Service()
export class Voting {
    voting = false
    options: string[] = []
    connections: RBXScriptConnection[] = []

    votes: Record<number, number> = {}
    hasVoted: string[] = []

    // HACK yeahhhh self explanatory
    private randomElement(array: Array<string>) {
        return array[math.random(1, array.size() - 1)]
    }

    private padTouched(option: number, touched: BasePart) {
        const character = touched.Parent
        const player = Players.GetPlayerFromCharacter(character)

        if (!character) return
        if (!player) return
        const humanoid = character?.FindFirstChildWhichIsA("Humanoid")

        if (!humanoid) return
        if (this.hasVoted.includes(character.Name)) return

        this.hasVoted.push(character.Name)
        this.votes[option]++

        Events.votingReducer.fire(player, { type: "displayVoted", option: option })
        Events.votingReducer.broadcast({ type: "setVoteCount", option: option + 1, votes: this.votes[option] })
    }

    public StartVoting() {
        if (this.voting) return
        this.voting = true

        this.votes = {
            [0]: 0,
            [1]: 0,
            [2]: 0,
        }

        const clone = maps

        clone.remove(clone.indexOf("none"))
        for (let i = 0; i < 3; i++) {
            const randomOption = this.randomElement(clone)
            this.options.push(randomOption)
            Events.votingReducer.broadcast({
                type: "displayOption",
                option: i + 1,
                name: randomOption,
                image: 0
            })
            clone.remove(clone.indexOf(randomOption))
        }

        this.connections.push(pads.pad1.Touched.Connect((touched) => this.padTouched(0, touched)))
        this.connections.push(pads.pad2.Touched.Connect((touched) => this.padTouched(1, touched)))
        this.connections.push(pads.pad3.Touched.Connect((touched) => this.padTouched(2, touched)))
    }

    public StopVotingAndReturnResult() {
        if (!this.voting) {
            warn("trying to stop vote when its already stopped")
            return "none"
        }

        this.voting = false

        this.connections.forEach((connection) => connection.Disconnect())
        this.connections.clear()

        let mostVotedIndex = 0

        for (const [index, value] of pairs(this.votes)) {
            if (value > this.votes[mostVotedIndex]) mostVotedIndex = index
        }

        // keep the value before the options are cleared
        const result = this.options[mostVotedIndex]

        this.options.clear()
        this.hasVoted.clear()
        this.votes = {}

        return result
    }
}
