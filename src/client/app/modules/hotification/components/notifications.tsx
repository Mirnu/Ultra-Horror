import { Frame } from "../../../ui/frame";
import Roact from "@rbxts/roact";
import { Notification } from "./notification";
import { useSelector } from "@rbxts/react-reflex";
import { selectNotifications } from "../store/notification/notification-selectors";

export const NotificationContainer = () => {
	const notifications = useSelector(selectNotifications);

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
