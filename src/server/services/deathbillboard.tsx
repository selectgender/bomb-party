import Roact from "@rbxts/roact";
import { Workspace, Players } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { withHookDetection } from "@rbxts/roact-hooked";
import { promiseR6 } from "@rbxts/promise-character";

import store, { State } from "server/store";
import { StoreProvider, useSelector } from "@rbxts/roact-rodux-hooked";

// roact components placed outside bc its the only way it doesn't error :sob:

interface Props {
	player: Player;
}

function Profile(props: Props) {
	const [content, _] = Players.GetUserThumbnailAsync(
		props.player.UserId,
		Enum.ThumbnailType.HeadShot,
		Enum.ThumbnailSize.Size420x420,
	);

	return (
		<frame Size={UDim2.fromScale(0.9, 0.2)} BorderSizePixel={0} BackgroundColor3={Color3.fromRGB(60, 56, 54)}>
			<uicorner CornerRadius={new UDim(0.2, 0)} />
			<imagelabel
				Size={UDim2.fromScale(0.09, 0.9)}
				AnchorPoint={Vector2.yAxis.mul(0.5)}
				Position={UDim2.fromScale(0.01, 0.5)}
				Image={content}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uistroke Color={Color3.fromRGB(251, 241, 199)} />
			</imagelabel>
			<textlabel
				Position={UDim2.fromScale(0.1, 0)}
				Size={UDim2.fromScale(0.9, 1)}
				TextXAlignment={Enum.TextXAlignment.Center}
				Font={Enum.Font.GothamBold}
				TextSize={20}
				Text={`<font size="30">${props.player.DisplayName}</font> died!`}
				RichText={true}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(251, 183, 162)}
			/>
			<textlabel
				AnchorPoint={Vector2.xAxis}
				Position={UDim2.fromScale(1, 0)}
				Size={UDim2.fromScale(0.1, 1)}
				Text={"💀"}
				TextSize={20}
				BackgroundTransparency={1}
			/>
		</frame>
	);
}

function App() {
	// yes.. we have to separate the states interface with the state.. it doesn't track the changes if I dont..
	const deathsState = useSelector((state: State) => state.deaths);
	const deaths = deathsState.deaths;
	const profiles: Roact.Element[] = [];

	deaths.iter().forEach((player) => profiles.push(<Profile player={player} />));

	return (
		<scrollingframe
			Size={UDim2.fromScale(1, 1)}
			BorderSizePixel={0}
			BackgroundColor3={Color3.fromRGB(189, 174, 147)}
			AutomaticCanvasSize={Enum.AutomaticSize.Y}
		>
			<uilistlayout HorizontalAlignment={Enum.HorizontalAlignment.Center} Padding={new UDim(0.01, 0)} />
			{Roact.createFragment(profiles)}
		</scrollingframe>
	);
}

function Surface() {
	return (
		<surfacegui CanvasSize={new Vector2(400, 175)}>
			<App />
		</surfacegui>
	);
}

@Service()
export class DeathBillboard implements OnStart {
	display = Workspace.lobby.death_billboard.display;

	onStart() {
		async function detectDeath(player: Player) {
			player.CharacterAdded.Connect(async (model) => {
				const character = await promiseR6(model);
				character.Humanoid.Died.Connect(() => {
					store.dispatch({ type: "addDeath", player: player });
				});
			});
		}

		withHookDetection(Roact);

		Roact.mount(
			<StoreProvider store={store}>
				<Surface />
			</StoreProvider>,
			this.display,
		);

		Players.PlayerAdded.Connect((player) => detectDeath(player));
		Players.GetPlayers().map((player) => detectDeath(player));
	}
}
