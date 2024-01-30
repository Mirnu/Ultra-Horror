import { Networking } from "@flamework/networking";
import { Notifications } from "./types/Notification";

interface ClientToServerEvents {}

interface ServerToClientEvents {
	Notify(notification: Notifications): void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
