import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { BombRain } from "server/services/bombrain";

export = (_: CommandContext, difficulty: number) => Dependency<BombRain>().setDifficulty(difficulty);
