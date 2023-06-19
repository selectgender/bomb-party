import { Dependency } from "@flamework/core";
import { BombRain } from "server/services/bombrain";

export = () => Dependency<BombRain>().stopBombRain();
