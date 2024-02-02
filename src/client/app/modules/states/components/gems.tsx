import { useSelector } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";
import { Frame } from "client/app/ui/frame";
import { Text } from "client/app/ui/text";
import { LocalPlayer } from "client/utils";
import { selectPlayerGems } from "shared/store/saves/save-selectors";

export function Gems() {
	const gems = useSelector(selectPlayerGems(LocalPlayer.Name));

	return (
		<Frame
			backgroundColor={Color3.fromRGB(255, 255, 255)}
			position={new UDim2(0.836, 0, 0.411, 0)}
			size={new UDim2(0.128, 0, 0.084, 0)}
			cornerRadius={new UDim(0.4, 0)}
		>
			<uigradient
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, Color3.fromRGB(224, 229, 134)),
						new ColorSequenceKeypoint(1, Color3.fromRGB(241, 255, 114)),
					])
				}
				Offset={new Vector2(0, 5)}
				Rotation={90}
			/>
			<uistroke Thickness={1.8} Transparency={0.58} />
			<Text
				backgroundTransparency={1}
				font={new Font("SourceSans", Enum.FontWeight.Bold)}
				position={new UDim2(0.051, 0, 0, 0)}
				size={new UDim2(0.897, 0, 1, 0)}
				text={tostring(gems) ?? "0"}
				textColor={Color3.fromRGB(0, 0, 0)}
				textScaled={true}
				textSize={14}
				textWrapped={true}
				textXAlignment={"Right"}
			>
				<uistroke Color={Color3.fromRGB(238, 255, 131)} Thickness={1.5} />
			</Text>
		</Frame>
	);
}
