import { Components } from "@flamework/components";
import { Service, OnStart } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService, Workspace } from "@rbxts/services";
import { Zone } from "@rbxts/zone-plus";
import { BackRooms } from "server/classes/BackRooms/BackRooms";
import { Gems } from "server/classes/Gems/Gems";
import { Events } from "server/network";
import { store } from "server/store";
import { selectPlayerSave } from "shared/store/saves/save-selectors";
import { PlayerSave } from "shared/store/saves/save-slice";

let DataStoreName = "Production";
const KEY_TEMPLATE = "%d_Data";

if (RunService.IsStudio()) DataStoreName = "Testing";

const defaultSaveData: PlayerSave = {
	gems: 0,
};

@Service({})
export class PlayerService implements OnStart {
	constructor(private components: Components) {}

	private profileStore = ProfileService.GetProfileStore(DataStoreName, defaultSaveData);
	private profiles = new Map<Player, Profile<PlayerSave>>();

	public SafeZone!: Zone;

	onStart() {
		this.playerHandle();
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

	private playerHandle() {
		Players.PlayerAdded.Connect((player) => {
			this.createProfile(player);
		});
		Players.PlayerRemoving.Connect((player) => {
			this.removeProfile(player);
		});
	}

	private createProfile(player: Player) {
		const userId = player.UserId;
		const profileKey = KEY_TEMPLATE.format(userId);
		const profile = this.profileStore.LoadProfileAsync(profileKey);

		if (!profile) return player.Kick();

		profile.ListenToRelease(() => {
			this.profiles.delete(player);
			store.deletePlayerSave(player.Name);
			player.Kick();
		});

		profile.AddUserId(userId);
		profile.Reconcile();

		this.profiles.set(player, profile);
		store.setPlayerSave(player.Name, profile.Data);
		this.createLeaderstats(player, profile.Data);

		const unsubscribe = store.subscribe(selectPlayerSave(player.Name), (save) => {
			if (save) profile.Data = save;
		});

		Players.PlayerRemoving.Connect((_player) => {
			if (player === _player) unsubscribe;
		});
	}

	private createLeaderstats(player: Player, data: PlayerSave) {
		const leaderstats = new Instance("Folder", player);
		leaderstats.Name = "leaderstats";

		const gems = new Instance("NumberValue");
		gems.Value = data.gems;
		gems.Name = "Gems";
		gems.Parent = leaderstats;

		const unsubscribe = store.subscribe(selectPlayerSave(player.Name), (save) => {
			gems.Value = save?.gems ?? 0;
		});
		Players.PlayerRemoving.Connect((player) => {
			if (player === player) unsubscribe();
		});
	}

	private removeProfile(player: Player) {
		const profile = this.profiles.get(player);
		profile?.Release();
	}

	public getProfile(player: Player) {
		return this.profiles.get(player);
	}
}
