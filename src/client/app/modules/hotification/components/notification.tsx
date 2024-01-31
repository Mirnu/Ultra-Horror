import Roact, { useEffect, useRef } from "@rbxts/roact";
import { Frame } from "../../../ui/frame";
import { Text } from "../../../ui/text";
import { fonts } from "../../../shared/constants/font";
import { useRem } from "../../../shared/hooks/use-rem";
import { useMotion } from "../../../shared/hooks/use-motion";
import { springs } from "../../../shared/constants/springs";
import { Notification } from "../store/notification/notification-slice";
import { Button } from "client/app/ui/button";
import { store } from "../store";

interface NotificationProps {
	notification: Notification;
}

export function Notification({ notification }: NotificationProps) {
	const rem = useRem();
	const original = UDim2.fromScale(0.073, 0.869);
	const [notifOffset, notifMotion] = useMotion(original);
	const [transparency, transparencyMotion] = useMotion(0);

	useEffect(() => {
		notifMotion.spring(UDim2.fromScale(1.5, original.Y.Scale), springs.responsive);
		transparencyMotion.spring(notification?.visible ? 0 : 1, springs.gentle);
	}, [notification?.visible]);

	const onClick = () => {
		store.removeNotification(notification.id);
	};

	return (
		<Frame
			size={UDim2.fromScale(0.862, 0.111)}
			position={notifOffset.getValue()}
			backgroundTransparency={0.5 * (transparency.getValue() + 1)}
			backgroundColor={Color3.fromRGB(64, 64, 64)}
		>
			<uicorner CornerRadius={new UDim(0.25, 0)}></uicorner>
			<Text
				textTransparency={transparency.getValue()}
				backgroundTransparency={1}
				font={fonts.inter.regular}
				richText={true}
				size={new UDim2(1, 0, 1, 0)}
				text={notification.message}
				textColor={Color3.fromRGB(218, 218, 218)}
				textSize={rem(2)}
				textWrapped={true}
			/>
			<Button size={UDim2.fromScale(1, 1)} onClick={onClick} backgroundTransparency={1} />
		</Frame>
	);
}
