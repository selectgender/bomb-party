import Roact from "@rbxts/roact"
import { withHookDetection } from "@rbxts/roact-hooked"
import Announcement from "../controllers/announcements/app"

export = (target: Instance) => {
  withHookDetection(Roact)
  const handle = Roact.mount(
    <Announcement 
      text={"long paragraphlong paragraphlong paragraphlong paragraphlong paragraphlong paragraphlong paragraphlong paragraphlong paragraphlong paragraph"}
    />,
    target)

  return () => {
    Roact.unmount(handle)
  }
}
