import { createProducer } from "@rbxts/reflex";
import { Notifications } from "shared/types/Notification";
import { mapProperty } from "shared/utils/object-utils";

export interface NotificationState {
	readonly notifications: readonly Notification[];
}

export interface Notification {
	readonly id: number;
	readonly message: keyof typeof Notifications;
	readonly color: Color3;
	readonly visible: boolean;
	readonly duration?: number;
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
	setNotificationVisible: (state, id: number, visible: boolean) => ({
		...state,
		notifications: state.notifications.map((notification) =>
			notification.id === id ? { ...notification, visible } : notification,
		),
	}),
});
