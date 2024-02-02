import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import { receiverMiddleware } from "./middleware/receiver";
import { notificationSlice } from "./notification/notification-slice";

export type RootStore = typeof store;

export type RootType = InferState<typeof store>;

export function createStore() {
	const store = combineProducers({
		...slices,
		notification: notificationSlice,
	});

	store.applyMiddleware(receiverMiddleware());
	return store;
}

export const store = createStore();
