import Roact from "@rbxts/roact";
import { RunService } from "@rbxts/services";
import { useBinding } from "@rbxts/roact-hooked";
import { useEventListener } from "@rbxts/pretty-roact-hooks";
import { Events } from "client/network";

function App() {
	const [title, setTitle] = useBinding("status");
	const [timeLeft, setTimeLeft] = useBinding(0);
	const [active, toggle] = useBinding(false);

	useEventListener(Events.updateStatus, (title, time) => {
		toggle(false);
		setTitle(title);
		setTimeLeft(time);
		toggle(true);
	});

	useEventListener(RunService.Heartbeat, (deltaTime) => {
		if (active.getValue()) {
			setTimeLeft(timeLeft.getValue() - deltaTime);
			if (timeLeft.getValue() < 0) {
				setTimeLeft(0);
				toggle(false);
			}
		}
	});

	return (
		<>
			<textlabel
				Size={UDim2.fromScale(0.09, 0.032)}
				Position={UDim2.fromScale(0.02, 0.02)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
				TextScaled={true}
				Font={Enum.Font.GothamMedium}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Text={title}
			>
				<uistroke Thickness={2} />
			</textlabel>
			<textlabel
				Size={UDim2.fromScale(0.09, 0.025)}
				Position={UDim2.fromScale(0.02, 0.06)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
				TextScaled={true}
				Font={Enum.Font.GothamMedium}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Text={timeLeft.map((num) => {
					const rounded = math.floor(num * 100) / 100;
					return tostring(rounded);
				})}
			>
				<uistroke Thickness={2} />
			</textlabel>
		</>
	);
}

export default App;
