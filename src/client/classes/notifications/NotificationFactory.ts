import Maid from "@rbxts/maid";
import { store } from "client/app/modules/hotification";
import { selectNotifications } from "client/store/notification/notification-selectors";
import { Events } from "client/network";
import { LocalPlayer } from "client/utils";
import { Notifications } from "shared/types/Notification";
import { GetCharacter } from "shared/utils/CharacterUtils";

let id = 0;

export function addNotification(notification: keyof typeof Notifications) {
	const maid = new Maid();
	store.addNotification({
		id: id,
		message: notification,
		visible: true,
		duration: Notifications[notification].duration,
		color: Notifications[notification].color,
	});
	const temp = id;
	maid.GiveTask(
		task.delay(Notifications[notification].duration, () => {
			store.removeNotification(temp);
			task.wait(0.3);
			store.setNotificationVisible(temp, false);
		}),
	);
	id += 1;

	maid.GiveTask(
		GetCharacter(LocalPlayer).Humanoid.HealthChanged.Connect((health) => {
			if (health === 0) {
				store.getState(selectNotifications).forEach((notification) => {
					store.removeNotification(notification.id);
				});
				maid.DoCleaning();
			}
		}),
	);
}

Events.Notify.connect((notification) => addNotification(notification));
