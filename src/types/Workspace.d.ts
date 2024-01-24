interface Workspace extends Instance {
	Map: Folder & {
		SafeZone: Part & {
			SafeZone: PathfindingModifier;
		};
	};
}
