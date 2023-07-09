interface ServerStorage extends Instance {
	Maps: Folder;
}

interface Workspace extends Instance {
	lobby: Folder & {
		death_billboard: Model & {
			display: Part;
		};
		donation_board: Model & {
			display: Part;
		};
		reentry: Model & {
			reenterbutton: Model & {
				trigger: Part;
			};
		};
		voting: Model & {
			board1: Model & {
				Part: Part;
				image: Part;
				mapname: Part;
				votecounter: Part;
			};
			board2: Model & {
				Part: Part;
				image: Part;
				mapname: Part;
				votecounter: Part;
			};
			board3: Model & {
				Part: Part;
				image: Part;
				mapname: Part;
				votecounter: Part;
			};
			pads: Model & {
				pad1: Part;
				pad2: Part;
				pad3: Part;
			}
		}
	};
}

interface Player extends Instance {
	PlayerGui: PlayerGui;
}

interface ServerStorage extends Instance {
	Assets: Folder & {
		Bomb: MeshPart;
	};
}
