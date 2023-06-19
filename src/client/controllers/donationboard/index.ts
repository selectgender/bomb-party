import Roact from "@rbxts/roact";
import App from "./app";
import { Workspace } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { withHookDetection } from "@rbxts/roact-hooked";

@Controller()
export class DonationBoard implements OnStart {
	onStart() {
		withHookDetection(Roact);

		Roact.mount(
			Roact.createElement(
				"SurfaceGui",
				{},
				{
					Child: Roact.createElement(App),
				},
			),
			Workspace.lobby.donation_board.display,
		);
	}
}
