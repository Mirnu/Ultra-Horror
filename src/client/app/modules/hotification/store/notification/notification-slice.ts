import { createProducer } from "@rbxts/reflex";
import { Notifications } from "shared/types/Notification";

export interface NotificationState {
	readonly notifications: readonly Notification[];
}

export interface Notification {
	readonly id: number;
	readonly message: Notifications;
	readonly sound?: string;
}

const initalState: NotificationState = {
	notifications: [],
};

export const notificationSlice = createProducer(initalState, {
	addNotification: (state, notification: Notification) => ({
		...state,
		notifications: [notification, ...state.notifications],
	}),
	removeNotification: (state, id: number) => ({
		...state,
		notifications: state.notifications.filter((value) => value.id !== id),
	}),
});
