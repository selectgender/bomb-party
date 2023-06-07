import Roact from "@rbxts/roact"
import DonationBoard from "client/controllers/donationboard/app"
import { Workspace } from "@rbxts/services"
import { withHookDetection } from "@rbxts/roact-hooked"

export = () => {
  withHookDetection(Roact)
  const handle = Roact.mount(
    <surfacegui>
      <DonationBoard />
    </surfacegui>,
    Workspace.lobby.donation_board.display
  )

  return () => {
    Roact.unmount(handle) 
  }
}
