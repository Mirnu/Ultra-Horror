import { Service, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Zone } from "@rbxts/zone-plus";
import { BackRooms } from "server/classes/BackRooms/BackRooms";
import { Enemies } from "server/classes/Enemy/Enemies";

@Service({})
export class PlayerService implements OnStart {
	public SafeZone = new Zone(Workspace.Map.SafeZone);

	onStart() {
		new BackRooms().Init();
		new Enemies().Init();
	}
}
