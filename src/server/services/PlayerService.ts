import { Service, OnStart } from "@flamework/core";
import { BackRooms } from "server/classes/BackRooms/BackRooms";
import { Enemies } from "server/classes/Enemy/Enemies";

@Service({})
export class PlayerService implements OnStart {
	onStart() {
		new BackRooms().Init();
		new Enemies().Init();
	}
}
