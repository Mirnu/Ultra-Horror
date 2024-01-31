import Roact from "@rbxts/roact";
import { Button, ButtonProps } from "client/app/ui/button";
import { Frame } from "client/app/ui/frame";

interface ArrowProps extends ButtonProps {
	position: UDim2;
	size: UDim2;
}

export function Arrow({ onClick, position, size }: ArrowProps) {
	return (
		<Frame
			backgroundColor={Color3.fromRGB(255, 255, 255)}
			position={position}
			size={size}
			cornerRadius={new UDim(1, 0)}
		>
			<Button onClick={onClick} size={UDim2.fromScale(1, 1)} backgroundTransparency={1} />
		</Frame>
	);
}
