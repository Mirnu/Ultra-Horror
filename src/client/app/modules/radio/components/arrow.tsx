import Roact from "@rbxts/roact";
import { Button, ButtonProps } from "client/app/ui/button";
import { Frame } from "client/app/ui/frame";
import { Image } from "client/app/ui/image";

interface ArrowProps extends ButtonProps {
	position: UDim2;
	size: UDim2;
	rotation: number;
}

export function Arrow({ onClick, position, size, rotation }: ArrowProps) {
	return (
		<Image
			backgroundColor={Color3.fromRGB(255, 255, 255)}
			position={position}
			size={size}
			cornerRadius={new UDim(1, 0)}
			image={"http://www.roblox.com/asset/?id=6439030099"}
			rotation={rotation}
		>
			<Button onClick={onClick} size={UDim2.fromScale(1, 1)} backgroundTransparency={1} />
		</Image>
	);
}
