import Roact from "@rbxts/roact";
import { Frame } from "../ui/frame";
import { Text } from "../ui/text";
import { fonts } from "../../constants/font";
import { useRem } from "../../hooks/use-rem";

export function Notification() {
	const rem = useRem();

	return (
		<Frame
			size={UDim2.fromScale(0.146, 0.078)}
			position={UDim2.fromScale(0.789, 0.901)}
			backgroundTransparency={0.5}
			backgroundColor={Color3.fromRGB(64, 64, 64)}
		>
			<uicorner CornerRadius={new UDim(0.25, 0)}></uicorner>
			<Text
				backgroundTransparency={1}
				font={fonts.inter.regular}
				richText={true}
				size={new UDim2(1, 0, 1, 0)}
				text="you are in safe zone"
				textColor={Color3.fromRGB(218, 218, 218)}
				textSize={rem(1.5)}
				textWrapped={true}
			></Text>
		</Frame>
	);
}
