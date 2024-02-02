import { Networking } from "@flamework/networking";
import { Notifications } from "./types/Notification";
import { BroadcastAction } from "@rbxts/reflex";

interface ClientToServerEvents {
	requestState(): void;
}

interface ServerToClientEvents {
	Notify(notification: keyof typeof Notifications): void;
	broadcast(actions: BroadcastAction[]): void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
