interface ReplicatedStorage extends Instance {
	Prefabs: Folder & {
		Enemies: Folder & {
			Freddy: Enemy;
			Chipi: Folder & {
				Decals: Folder & {};
			};
		};

		Sound: Folder & {
			light: Sound;
		};
	};
}
