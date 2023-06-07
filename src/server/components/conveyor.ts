import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface ComponentInstance extends Part {}
interface Attributes {
  speed: number
}

const beam_texture = "rbxassetid://4733841640"

@Component({
  tag: "conveyor",
  defaults: {
    speed: 50
  }
})
export class Conveyor extends BaseComponent<Attributes, ComponentInstance> implements OnStart {
  onStart() {
    const beam = new Instance("Beam")
    const start = new Instance("Attachment")
    const finish = new Instance("Attachment")

    const part = this.instance
    part.AssemblyLinearVelocity = part.CFrame.LookVector.mul(this.attributes.speed)
    part.FrontSurface = Enum.SurfaceType.Smooth

    start.Position = new Vector3(0, part.Size.Y/2 + 0.1, part.Size.Z/2)
    start.Orientation = Vector3.zAxis.mul(90)
    finish.Position = new Vector3(0, part.Size.Y/2 + 0.1, -part.Size.Z/2)
    finish.Orientation = Vector3.zAxis.mul(90)

    beam.Attachment0 = start
    beam.Attachment1 = finish
    beam.Width0 = part.Size.X
    beam.Width1 = part.Size.X
    beam.Texture = beam_texture
    beam.TextureSpeed = -this.attributes.speed
    beam.TextureLength = this.attributes.speed

    start.Parent = part
    finish.Parent = part
    beam.Parent = part
  }
}
