import { Dependency } from "@flamework/core";
import { RoundManager } from "server/services/roundmanager";

export = () => Dependency<RoundManager>().teleportAll()
