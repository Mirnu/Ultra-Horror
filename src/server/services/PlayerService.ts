import { Service, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Zone } from "@rbxts/zone-plus";
import { BackRooms } from "server/classes/BackRooms/BackRooms";
import { Enemies } from "server/classes/Enemy/Enemies";
import { Events } from "server/network";
import { Notifications } from "shared/types/Notification";

@Service({})
export class PlayerService implements OnStart {
	public SafeZone!: Zone;

	onStart() {
		this.SafeZone = new Zone(Workspace.Map.SafeZone);
		new BackRooms().Init();
		new Enemies().Init();

		this.SafeZone.playerEntered.Connect((player) => {
			Events.Notify.fire(player, Notifications.PlayerZoneEntered);
		});
		this.SafeZone.playerExited.Connect((player) => {
			Events.Notify.fire(player, Notifications.PlayerZoneExitied);
		});
	}
}
