import Roact from "@rbxts/roact"
import Timer from "client/controllers/timer/app"
import { withHookDetection } from "@rbxts/roact-hooked"

export = (target: Instance) => {
  withHookDetection(Roact)
  const handle = Roact.mount(
    <screengui>
      <Timer />
    </screengui>,
    target
  )

  return () => {
    Roact.unmount(handle)
  }
}
