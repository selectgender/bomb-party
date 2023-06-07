import { Dependency } from "@flamework/core"
import { CommandContext } from "@rbxts/cmdr"
import { promiseR6 } from "@rbxts/promise-character"
import { BombRain } from "server/services/bombrain"

export = async function (context: CommandContext) {
  const model = context.Executor.Character
  if (!model) return;

  const character = await promiseR6(model)

  const bombRain = Dependency(BombRain)
  bombRain.Drop(character.HumanoidRootPart.Position.add(Vector3.yAxis.mul(2)))
}
