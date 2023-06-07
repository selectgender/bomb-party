import { Workspace, Debris, TweenService } from "@rbxts/services"
import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";

interface ComponentInstance extends MeshPart {}
interface Attributes {
  explosionDiameter: number
  damage: number
  knockback: number
}

@Component({
  defaults: {
    explosionDiameter: 18,
    damage: 33,
    knockback: 100,
  }
})
export class Bomb extends BaseComponent<Attributes, ComponentInstance> {
  components = Dependency<Components>()
  tweeninfo = new TweenInfo(0.4)

  private normalPartExplode(part: BasePart) {
    if (part.Anchored) part.Destroy();

    const bomb = this.instance

    for (const child of part.GetDescendants()) {
      if (!child.IsA("Weld")) continue;
      child.Destroy()
    }

    const unit = bomb.Position.sub(part.Position).Unit
    const magnitude = bomb.Position.sub(part.Position).Magnitude
    const velocity = 1/magnitude * 5000
    part.ApplyImpulse(unit.mul(part.AssemblyMass * velocity))
  }

  private async characterExplode(model: Model) {
    const character = await promiseR6(model).catch()
    if (!character) return;

    const bomb = this.instance

    const unit = bomb.Position.sub(character.Torso.Position).Unit
    const magnitude = bomb.Position.sub(character.Torso.Position).Magnitude
    const velocity = 1/magnitude * this.attributes.knockback

    const characterMass = character.GetChildren()
      .filter((part): part is BasePart => part.IsA("BasePart"))
      .reduce((sum, part) => sum + part.GetMass(), 0)

    const bodyVelocity = new Instance("BodyVelocity")
    bodyVelocity.MaxForce = Vector3.one.mul(math.huge)
    bodyVelocity.Velocity = unit.mul(characterMass * velocity).mul(-1)
    bodyVelocity.Parent = character.Torso

    character.Humanoid.Sit = true
    character.Humanoid.TakeDamage(this.attributes.damage)

    task.wait(0.1)
    bodyVelocity.Destroy()
  }

  public detonate() {
    const bomb = this.instance
    bomb.Anchored = true

    const impact = new Instance("Part")
    impact.Name = "impact"
    impact.Position = bomb.Position
    impact.Size = Vector3.one.mul(this.attributes.explosionDiameter)
    impact.Shape = Enum.PartType.Ball
    impact.Transparency = 1
    impact.Anchored = true
    impact.CanCollide = false
    impact.Parent = bomb.Parent

    const decoration = new Instance("Part")
    decoration.Name = "decoration"
    decoration.Position = bomb.Position
    decoration.Size = Vector3.one
    decoration.Shape = Enum.PartType.Ball
    decoration.Color = Color3.fromRGB(255, 255, 0)
    decoration.Transparency = 0.25
    decoration.Anchored = true
    decoration.CanCollide = false
    decoration.Parent = bomb.Parent

    TweenService.Create(decoration, this.tweeninfo, {
      Size: Vector3.one.mul(this.attributes.explosionDiameter),
      Color: Color3.fromRGB(255, 0, 0),
      Transparency: 1
    }).Play()

    const params = new OverlapParams()
    params.FilterType = Enum.RaycastFilterType.Exclude
    params.FilterDescendantsInstances = [
      Workspace.lobby,
      this.instance,
      impact,
      decoration
    ]

    const parts = Workspace.GetPartsInPart(impact, params)
    const charactersAlreadyHit: Model[] = []

    for (const part of parts) {
      const humanoid = part.Parent?.FindFirstChildOfClass("Humanoid")

      if (humanoid) {
        if (!part.Parent?.IsA("Model")) return;
        if (charactersAlreadyHit.includes(part.Parent)) return;

        charactersAlreadyHit.push(part.Parent)
        this.characterExplode(part.Parent)
      } else {
        this.normalPartExplode(part)
      };
    }

    Debris.AddItem(impact, 3)
    Debris.AddItem(decoration, 3)
    bomb.Destroy()
    this.destroy()
  }
}
