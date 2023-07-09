import { Dependency } from "@flamework/core";
import { Voting } from "server/services/voting";

export = () => Dependency<Voting>().StartVoting()
