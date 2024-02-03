import { ProducerMiddleware, createBroadcaster } from "@rbxts/reflex";
import { Events } from "server/network";
import { slices } from "shared/store";

export function broadcastMiddleware(): ProducerMiddleware {
	const broadcaster = createBroadcaster({
		producers: slices,
		dispatch: (player, actions) => {
			Events.broadcast.fire(player, actions);
		},
	});
	Events.requestState.connect((player) => broadcaster.start(player));
	return broadcaster.middleware;
}
