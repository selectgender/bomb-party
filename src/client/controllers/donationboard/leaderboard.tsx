import { useEventListener } from "@rbxts/pretty-roact-hooks";
import Roact, { Binding } from "@rbxts/roact";
import { useState } from "@rbxts/roact-hooked";
import { Events } from "client/network";
import Profile, { Props } from "./profile";

interface LeaderboardProps {
	position: Binding<number>;
}

function Leaderboard(props: LeaderboardProps) {
	const [profileProps, setProfileProps] = useState<Props[]>([]);

	useEventListener(Events.donationBoardRefresh, (data) => {
		setProfileProps(
			data.map((rankingData) => {
				return {
					name: rankingData.name,
					icon: rankingData.icon,
					amount: rankingData.amount,
					rank: rankingData.rank,
				};
			}),
		);
	});

	return (
		<scrollingframe
			Size={UDim2.fromScale(0.8, 0.8)}
			AnchorPoint={Vector2.one.mul(0.5)}
			Position={props.position.map((p) => UDim2.fromScale(0.5, 0.5).Lerp(UDim2.fromScale(2, 0.5), p))}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			{profileProps.map((prop) => {
				return <Profile name={prop.name} icon={prop.icon} amount={prop.amount} rank={prop.rank} />;
			})}
		</scrollingframe>
	);
}

export default Leaderboard;
