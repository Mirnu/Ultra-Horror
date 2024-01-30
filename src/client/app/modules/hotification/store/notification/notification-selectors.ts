import { RootState } from "..";

export const selectNotifications = (state: RootState) => {
	return state.notification.notifications;
};

export const selectNotification = (id: number) => {
	return (state: RootState) => state.notification.notifications.find((notification) => notification.id === id);
};
