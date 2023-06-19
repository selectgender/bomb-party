import { Controller, OnStart } from "@flamework/core";
import { CmdrClient } from "@rbxts/cmdr";

@Controller()
export class Cmdr implements OnStart {
	onStart() {
		// waits a few seconds bc the client loads before the server sometimes in studio :(
		task.wait(5);
		CmdrClient.SetActivationKeys([Enum.KeyCode.F2]);
	}
}
