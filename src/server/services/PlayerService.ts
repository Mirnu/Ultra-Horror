import { Components } from "@flamework/components";
import { Service, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Zone } from "@rbxts/zone-plus";
import { BackRooms } from "server/classes/BackRooms/BackRooms";
import { Gems } from "server/classes/Gems/Gems";
import { Events } from "server/network";

@Service({})
export class PlayerService implements OnStart {
	constructor(private components: Components) {}

	public SafeZone!: Zone;

	onStart() {
		this.SafeZone = new Zone(Workspace.Map.SafeZone);
		new BackRooms().Init();
		new Gems(this.components).Init();

		this.SafeZone.playerEntered.Connect((player) => {
			Events.Notify.fire(player, "PlayerZoneEntered");
		});
		this.SafeZone.playerExited.Connect((player) => {
			Events.Notify.fire(player, "PlayerZoneExitied");
		});
	}
}
