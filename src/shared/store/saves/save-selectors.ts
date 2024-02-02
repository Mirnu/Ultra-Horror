import { SharedState } from "..";

export const selectPlayerSaves = (state: SharedState) => {
	return state.saves;
};

export const selectPlayerSave = (id: string) => {
	return (state: SharedState) => state.saves[id];
};

export const selectPlayerGems = (id: string) => {
	return (state: SharedState) => state.saves[id]?.gems;
};
