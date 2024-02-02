import { RootType } from "..";

export const selectNotifications = (state: RootType) => {
	return state.notification.notifications;
};

export const selectNotification = (id: number) => {
	return (state: RootType) => state.notification.notifications.find((notification) => notification.id === id);
};
