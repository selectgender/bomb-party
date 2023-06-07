import Roact from "@rbxts/roact";

function Leaderboard() {
	return (
		<scrollingframe
			Size={UDim2.fromScale(0.8, 0.8)}
			AnchorPoint={Vector2.one.mul(0.5)}
			Position={UDim2.fromScale(0.5, 0.5)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			<textlabel Text={"leaderboard"} Size={UDim2.fromScale(1, 0.1)} />
		</scrollingframe>
	);
}

export default Leaderboard;
