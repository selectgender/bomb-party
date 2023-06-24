import { Service } from "@flamework/core";
import { maps } from "shared/types/constants/maps";

@Service()
export class Voting {
    voting = false;

    public StartVoting() {
        if (this.voting) return
        this.voting = true
    }

    public StopVoting() {
        if (!this.voting) return
        this.voting = false
    }
}
