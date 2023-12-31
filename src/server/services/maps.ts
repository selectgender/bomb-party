import { ServerStorage, Workspace } from "@rbxts/services";
import { Service } from "@flamework/core";
import { Option } from "@rbxts/rust-classes";

@Service()
export class Maps {
	public map: Option<string> = Option.none();
	currentInstance: Folder | undefined = undefined;

	public changeMap(option: Option<string>) {
		if (this.map.toString() === option.toString()) return;
		this.map = option;

		if (option.isNone()) {
			if (!this.currentInstance) return;
			this.currentInstance.Destroy();
			this.currentInstance = undefined;
			return;
		}

		const optionString = option.unwrap();
		const found = ServerStorage.Maps.FindFirstChild(optionString);

		if (!found) {
			warn(`map ${optionString} does not exist.. please revise whatever the hell you put in the cmdr type haha`);
			return;
		}

		if (!found.IsA("Folder")) {
			warn(`map ${optionString} apparently isnt a folder?? you might wanna check that out...`);
			return;
		}

		if (this.currentInstance) this.currentInstance.Destroy();

		const instance = found.Clone();

		this.currentInstance = instance;
		instance.Parent = Workspace;
	}
}
