import Roact, { useEffect, useRef } from "@rbxts/roact";
import { Frame } from "../../../ui/frame";
import { Text } from "../../../ui/text";
import { fonts } from "../../../shared/constants/font";
import { useRem } from "../../../shared/hooks/use-rem";
import { useTimeout } from "@rbxts/pretty-react-hooks";
import { useMotion } from "../../../shared/hooks/use-motion";
import { springs } from "../../../shared/constants/springs";
import { Notifications } from "shared/types/Notification";
import { store } from "../store";

interface NotificationProps {
	notification: Notifications;
	id: number;
}

export function Notification({ notification, id }: NotificationProps) {
	const rem = useRem();
	const ref = useRef();
	const original = UDim2.fromScale(0.073, 0.869);
	const [notifOffset, notifMotion] = useMotion(original);
	const [transparency, transparencyMotion] = useMotion(0);

	useTimeout(() => {
		notifMotion.spring(UDim2.fromScale(1.5, original.Y.Scale), springs.responsive);
		transparencyMotion.tween(1, { time: 0.5 });
	}, 2.5);

	useTimeout(() => {
		store.removeNotification(id);
	}, 3);

	return (
		<Frame
			size={UDim2.fromScale(0.862, 0.111)}
			position={notifOffset.getValue()}
			backgroundTransparency={0.5 * (transparency.getValue() + 1)}
			backgroundColor={Color3.fromRGB(64, 64, 64)}
			ref={ref}
		>
			<uicorner CornerRadius={new UDim(0.25, 0)}></uicorner>
			<Text
				textTransparency={transparency.getValue()}
				backgroundTransparency={1}
				font={fonts.inter.regular}
				richText={true}
				size={new UDim2(1, 0, 1, 0)}
				text={notification}
				textColor={Color3.fromRGB(218, 218, 218)}
				textSize={rem(1)}
				textWrapped={true}
			></Text>
		</Frame>
	);
}
