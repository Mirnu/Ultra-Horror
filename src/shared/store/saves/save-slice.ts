import { createProducer } from "@rbxts/reflex";
import { mapProperty } from "shared/utils/object-utils";

export interface PlayerSave {
	gems: number;
}

export interface SaveState {
	readonly [id: string]: PlayerSave | undefined;
}

const initialState: SaveState = {};

export const saveSlice = createProducer(initialState, {
	setPlayerSave: (state, player: string, save: PlayerSave) => ({
		...state,
		[player]: save,
	}),

	deletePlayerSave: (state, player: string) => ({
		...state,
		[player]: undefined,
	}),
	givePlayerGems: (state, player: string, gems: number) => {
		return mapProperty(state, player, (save) => ({
			...save,
			gems: math.max(0, save.gems + gems),
		}));
	},
});
