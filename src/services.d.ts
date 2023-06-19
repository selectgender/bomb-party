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
