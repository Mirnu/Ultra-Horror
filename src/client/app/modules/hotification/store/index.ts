import { InferState, combineProducers } from "@rbxts/reflex";
import { notificationSlice } from "./notification/notification-slice";

export type RootStore = typeof store;

export type RootState = InferState<RootStore>;

export function createStore() {
	const store = combineProducers({
		notification: notificationSlice,
	});

	return store;
}

export const store = createStore();
