import Roact, { useEffect, useState } from "@rbxts/roact";
import { ReplicatedStorage } from "@rbxts/services";
import { Frame } from "client/app/ui/frame";
import { Text } from "client/app/ui/text";
import { Arrow } from "./arrow";
import { usePrevious } from "@rbxts/pretty-react-hooks";

export function Radio() {
	const sounds = ReplicatedStorage.Prefabs.Sound.Radio.GetChildren() as Sound[];
	const [sound, setSound] = useState<Sound>(sounds[0]);
	const prevSound = usePrevious(sound);

	const onLeftClick = () => {
		const id = sounds.indexOf(sound);
		setSound(sounds[id - 1] ? sounds[id - 1] : sounds[sounds.size()]);
	};

	const onRightClick = () => {
		const id = sounds.indexOf(sound);
		setSound(sounds[id + 1] ? sounds[id + 1] : sounds[0]);
	};

	useEffect(() => {
		prevSound?.Stop();
		sound.Play();
	}, [sound]);

	return (
		<Frame
			backgroundColor={Color3.fromRGB(255, 255, 255)}
			position={new UDim2(0.112, 0, 0.857, 0)}
			size={new UDim2(0.125, 0, 0.066, 0)}
			cornerRadius={new UDim(1, 0)}
		>
			<Text
				backgroundTransparency={1}
				font={new Font("SourceSans", Enum.FontWeight.Bold)}
				richText={true}
				size={new UDim2(1, 0, 1, 0)}
				text={sound.Name}
				textColor={Color3.fromRGB(0, 0, 0)}
				textScaled={true}
				textSize={14}
				textWrapped={true}
			/>
			<Arrow position={UDim2.fromScale(-0.454, -0.008)} size={UDim2.fromScale(0.389, 1)} onClick={onLeftClick} />
			<Arrow position={UDim2.fromScale(1.089, -0.008)} size={UDim2.fromScale(0.389, 1)} onClick={onRightClick} />
		</Frame>
	);
}
