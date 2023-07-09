import { Dependency } from "@flamework/core";
import { Voting } from "server/services/voting";

export = () => { return Dependency<Voting>().StopVotingAndReturnResult() }
