import { useEventListener } from "@rbxts/pretty-react-hooks";
import Roact, { useState } from "@rbxts/roact";
import { UserInputService } from "@rbxts/services";
import { Button } from "client/app/ui/button";

export function Modal() {
	const [modal, setModal] = useState(false);

	useEventListener(UserInputService.InputBegan, (input) => {
		if (input.KeyCode === Enum.KeyCode.LeftAlt) {
			setModal(true);
		}
	});

	useEventListener(UserInputService.InputEnded, (input) => {
		if (input.KeyCode === Enum.KeyCode.LeftAlt) {
			setModal(false);
		}
	});

	return <Button size={UDim2.fromScale(0, 0)} backgroundTransparency={1} modal={modal} />;
}
