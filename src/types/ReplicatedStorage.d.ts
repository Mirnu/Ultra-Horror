interface ReplicatedStorage extends Instance {
	Prefabs: Folder & {
		Animations: Folder & {
			Dash: Folder & {
				Dash: Animation;
			};
		};

		Meshes: Folder & {
			Gem: MeshPart;
		};

		Enemies: Folder & {
			Freddy: Enemy;
			Chipi: Folder & {
				Decals: Folder & {};
			};
		};

		Sound: Folder & {
			Radio: Folder;
			light: Sound;
		};
	};
}
