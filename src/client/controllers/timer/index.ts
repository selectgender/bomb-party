import Roact from "@rbxts/roact"
import { Controller, OnStart } from "@flamework/core";
import App from "./app";

@Controller()
export class Timer implements OnStart {
    onStart(): void {
        Roact.mount(Roact.createElement(App))
    }
}
