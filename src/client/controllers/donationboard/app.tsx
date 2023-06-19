import Roact from "@rbxts/roact";
import Leaderboard from "./leaderboard";
import Donate from "./donate";
import { useState } from "@rbxts/roact-hooked";
import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";

type Pages = "Donate" | "Leaderboard";

function App() {
	const springSettings = {
		frequency: 2,
		dampingRatio: 0.75,
	};

	const [page, setPage] = useState<Pages>("Leaderboard");
	const [leaderboardPosition, setLeaderboardPosition] = useMotor(0);
	const [donatePosition, setDonatePosition] = useMotor(1);

	const inversePage = () => {
		if (page === "Donate") return "Leaderboard";
		else if (page === "Leaderboard") return "Donate";
		else return "Leaderboard";
	};

	return (
		<frame
			Size={UDim2.fromScale(1, 1)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BorderSizePixel={0}
			ClipsDescendants={true}
		>
			<textlabel
				Size={UDim2.fromScale(1, 0.1)}
				TextScaled={true}
				Font={Enum.Font.GothamBold}
				Text={"Donations"}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(40, 40, 40)}
			/>

			<Donate position={donatePosition} />
			<Leaderboard position={leaderboardPosition} />

			<textbutton
				AnchorPoint={Vector2.xAxis.mul(0.5)}
				Size={UDim2.fromScale(0.8, 0.1)}
				Position={UDim2.fromScale(0.5, 0.9)}
				TextScaled={true}
				Font={Enum.Font.GothamBold}
				Text={inversePage()}
				BackgroundColor3={Color3.fromRGB(213, 196, 161)}
				Event={{
					Activated: () => {
						if (page === "Leaderboard") {
							setPage("Donate");
							setDonatePosition(new Spring(0, springSettings));
							setLeaderboardPosition(new Spring(1, springSettings));
						} else if (page === "Donate") {
							setPage("Leaderboard");
							setLeaderboardPosition(new Spring(0, springSettings));
							setDonatePosition(new Spring(1, springSettings));
						}
					},
				}}
			>
				<uicorner CornerRadius={new UDim(0.2, 0)} />
			</textbutton>
			<uigradient
				Rotation={90}
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, Color3.fromRGB(251, 241, 199)),
						new ColorSequenceKeypoint(1, Color3.fromRGB(213, 196, 161)),
					])
				}
			/>
		</frame>
	);
}

export default App;
