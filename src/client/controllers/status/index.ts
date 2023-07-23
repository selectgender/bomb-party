import Roact from "@rbxts/roact";
import App from "./app";
import { Players } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { withHookDetection } from "@rbxts/roact-hooked";

@Controller()
export class Status implements OnStart {
	onStart() {
		withHookDetection(Roact);

		Roact.mount(
			Roact.createElement(
				"ScreenGui",
				{
					ResetOnSpawn: false,
				},
				{
					Child: Roact.createElement(App),
				},
			),
			Players.LocalPlayer.PlayerGui,
			"Status",
		);
	}
}
