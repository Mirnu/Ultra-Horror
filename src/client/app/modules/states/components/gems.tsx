import { useSelector } from "@rbxts/react-reflex";
import Roact, { useEffect, useState } from "@rbxts/roact";
import { springs } from "client/app/shared/constants/springs";
import { useMotion } from "client/app/shared/hooks/use-motion";
import { useRem } from "client/app/shared/hooks/use-rem";
import { Frame } from "client/app/ui/frame";
import { Text } from "client/app/ui/text";
import { LocalPlayer, brighten } from "client/utils";
import { selectPlayerGems } from "shared/store/saves/save-selectors";

export function Gems() {
	const gems = useSelector(selectPlayerGems(LocalPlayer.Name));
	const rem = useRem();
	const [hovered, setHovered] = useState(false);
	const [buttonPosition, buttonPositionMotion] = useMotion(0);
	const [buttonColor, buttonColorMotion] = useMotion(Color3.fromRGB(224, 229, 134));

	useEffect(() => {
		if (hovered) {
			buttonPositionMotion.spring(rem(-0.05), springs.responsive);
			buttonColorMotion.spring(brighten(Color3.fromRGB(224, 229, 134), 0.1), springs.responsive);
		} else {
			buttonPositionMotion.spring(0, springs.responsive);
			buttonColorMotion.spring(Color3.fromRGB(224, 229, 134), springs.responsive);
		}
	}, [hovered]);

	return (
		<Frame
			position={new UDim2(0.836, 0, 0.411, 0)}
			size={new UDim2(0.128, 0, 0.084, 0)}
			backgroundTransparency={1}
			event={{
				MouseEnter: () => {
					setHovered(true);
				},
				MouseLeave: () => {
					setHovered(false);
				},
			}}
		>
			<Text
				font={new Font("SourceSans", Enum.FontWeight.Bold)}
				position={buttonPosition.map((y) => UDim2.fromScale(0.051, y))}
				size={new UDim2(0.897, 0, 1, 0)}
				text={tostring(gems) ?? "0"}
				textColor={Color3.fromRGB(0, 0, 0)}
				textScaled={true}
				textSize={14}
				textWrapped={true}
				textXAlignment={"Right"}
				cornerRadius={new UDim(0.4, 0)}
			>
				<uistroke Color={Color3.fromRGB(140, 161, 0)} Thickness={1.5} />
				<uigradient
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, buttonColor.getValue()),
							new ColorSequenceKeypoint(
								1,
								buttonColor.getValue().Lerp(new Color3(0.63, 0.62, 0.01), 0.5),
							),
						])
					}
					Offset={new Vector2(0, 5)}
					Rotation={90}
				/>
			</Text>
		</Frame>
	);
}
