import Roact from "@rbxts/roact";
import { Frame } from "client/app/ui/frame";
import { ButtonSetting } from "./button-settings";

export function ButtonsSettings() {
	return (
		<Frame backgroundTransparency={1} position={new UDim2(0.04, 0, 0.352, 0)} size={new UDim2(0, 112, 0, 175)}>
			<ButtonSetting text={"shift - run"} position={UDim2.fromScale(0.04, 0)} size={UDim2.fromScale(1, 0.23)} />
			<ButtonSetting
				text={"alt - free mouse movement"}
				position={UDim2.fromScale(0.04, 0.298)}
				size={UDim2.fromScale(1, 0.312)}
			/>
			<ButtonSetting
				text={"Q - dash"}
				position={UDim2.fromScale(0.04, 0.704)}
				size={UDim2.fromScale(0.994, 0.229)}
			/>
		</Frame>
	);
}
