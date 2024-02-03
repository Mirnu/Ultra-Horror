import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import { broadcastMiddleware } from "./middleware/broadcaster";

export type RootState = InferState<typeof store>;

export function createStore() {
	const store = combineProducers({
		...slices,
	});

	store.applyMiddleware(broadcastMiddleware());

	return store;
}

export const store = createStore();
