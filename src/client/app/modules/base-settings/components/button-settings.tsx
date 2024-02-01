import Roact, { useState } from "@rbxts/roact";
import { Button } from "client/app/ui/button";
import { Frame } from "client/app/ui/frame";
import { Text } from "client/app/ui/text";

interface ButtonSettingProps {
	text: string;
	position: UDim2;
	size: UDim2;
}

export function ButtonSetting({ text, position, size }: ButtonSettingProps) {
	const [visible, setVisible] = useState(true);

	return (
		<Frame
			backgroundColor={Color3.fromRGB(198, 198, 198)}
			position={position}
			size={size}
			cornerRadius={new UDim(0.2, 0)}
			visible={visible}
		>
			<Text
				backgroundTransparency={1}
				font={new Font("SourceSansBold", Enum.FontWeight.Bold)}
				position={new UDim2(0, 0, -0.019, 0)}
				richText={true}
				size={new UDim2(0.961, 0, 1.042, 0)}
				text={text}
				textColor={Color3.fromRGB(0, 0, 0)}
				textScaled={true}
				textSize={14}
				textWrapped={true}
				textXAlignment={"Left"}
			/>
			<Button
				cornerRadius={new UDim(0.2, 0)}
				backgroundTransparency={1}
				size={UDim2.fromScale(1, 1)}
				onClick={() => setVisible(false)}
				zIndex={2}
			/>
		</Frame>
	);
}
