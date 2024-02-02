import { ProducerMiddleware, createBroadcastReceiver } from "@rbxts/reflex";
import { Events } from "client/network";

export function receiverMiddleware(): ProducerMiddleware {
	const receiver = createBroadcastReceiver({
		start: () => {
			Events.requestState.fire();
		},
	});
	Events.broadcast.connect((actions) => receiver.dispatch(actions));

	return receiver.middleware;
}
