import { Dependency } from "@flamework/core";
import { Border } from "server/services/border";

export = () => Dependency<Border>().startBorder();
