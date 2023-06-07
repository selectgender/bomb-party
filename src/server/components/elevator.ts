import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";

interface ComponentInstance extends Part {}
interface Attributes {
  speed: number
}

const VELOCITY_MARKER = "ElevatorVelocity"

@Component({
  tag: "elevator",
  defaults: {
    speed: 40
  }
})
export class Elevator extends BaseComponent<Attributes, ComponentInstance> implements OnStart {
  elevator = this.instance

  async Touched(touched: BasePart) {
    if (!touched.Parent?.IsA("Model")) return;
    const character = await promiseR6(touched.Parent)

    if (character.Torso.FindFirstChild(VELOCITY_MARKER)) return;

    const velocity = new Instance("BodyVelocity")
    velocity.Name = VELOCITY_MARKER

    const up_vector = this.elevator.CFrame.UpVector

    // dont even think about setting this to Vector3.yaxis.mul(bla bla) it errors lmao
    let max_force = new Vector3(0, math.huge, 0)
    
    if (up_vector.X !== 0) max_force = new Vector3(math.huge, max_force.Y, max_force.Z);
    if (up_vector.Z !== 0) max_force = new Vector3(max_force.X, max_force.Y, math.huge);

    velocity.MaxForce = max_force
    velocity.Velocity = up_vector.mul(this.attributes.speed)

    velocity.Parent = character.Torso
  }

  async Untouched(touched: BasePart) {
    if (!touched.Parent?.IsA("Model")) return;

    const character = await promiseR6(touched.Parent)
    const velocity = character.Torso.FindFirstChild(VELOCITY_MARKER)
    
    if (!velocity) return;

    velocity.Destroy()
  }

  onStart() {
    this.elevator.TopSurface = Enum.SurfaceType.Weld
    this.elevator.Touched.Connect((touched) => { this.Touched(touched) })
    this.elevator.TouchEnded.Connect((touched) => { this.Untouched(touched) })
  }
}
