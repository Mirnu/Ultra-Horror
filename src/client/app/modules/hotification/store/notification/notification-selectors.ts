import { RootState } from "..";

export const selectNotifications = (state: RootState) => {
	return state.notification.notifications;
};
