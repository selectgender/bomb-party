import Roact from "@rbxts/roact"
import { Controller, OnStart } from "@flamework/core";
import { withHookDetection } from "@rbxts/roact-hooked";
import App from "./app";

@Controller()
export class Voting implements OnStart {
    onStart(): void {
        withHookDetection(Roact)
        Roact.mount(Roact.createElement(App))
    }
}
