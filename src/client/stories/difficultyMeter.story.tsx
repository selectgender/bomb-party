import Roact from "@rbxts/roact"
import { withHookDetection } from "@rbxts/roact-hooked"
import Meter from "../controllers/difficulty/app"

export = (target: Instance) => {
  withHookDetection(Roact)
  const handle = Roact.mount(
    <Meter 
      difficulty={5}
    />,
    target)

  return () => {
    Roact.unmount(handle)
  }
}
