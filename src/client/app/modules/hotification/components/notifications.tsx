import { Frame } from "../../../ui/frame";
import Roact from "@rbxts/roact";
import { Notification } from "./notification";
import { useSelector } from "@rbxts/react-reflex";
import { selectNotifications } from "../store/notification/notification-selectors";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { Events } from "client/network";
import { store } from "../store";

let id = 0;

export const Notifications = () => {
	const notifications = useSelector(selectNotifications);

	useEventListener(Events.Notify, (notification) => {
		store.addNotification({ id: id, message: notification, visible: true });
		const temp = id;
		task.delay(2.5, () => {
			store.removeNotification(temp);
			task.wait(0.3);
			store.setNotificationVisible(temp, false);
		});
		id += 1;
	});

	return (
		<Frame backgroundTransparency={1} position={new UDim2(0.758, 0, 0.379, 0)} size={new UDim2(0.194, 0, 0.601, 0)}>
			{notifications
				.filter((_, index) => index < 4)
				.map((value) => (
					<Notification notification={value} />
				))}
			<uilistlayout HorizontalAlignment={"Center"} VerticalAlignment={"Bottom"} Padding={new UDim(0.02, 0)} />
		</Frame>
	);
};
