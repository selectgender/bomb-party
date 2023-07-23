import Roact from "@rbxts/roact";
import Status from "client/controllers/status/app";
import { withHookDetection } from "@rbxts/roact-hooked";

export = (target: Instance) => {
	withHookDetection(Roact);
	const handle = Roact.mount(
		<screengui>
			<Status />
		</screengui>,
		target,
	);

	return () => {
		Roact.unmount(handle);
	};
};
