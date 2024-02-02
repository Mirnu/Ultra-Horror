import Roact from "@rbxts/roact";
import { Layer } from "./ui/layer";
import { Radio } from "./modules/radio";
import { NotificationContainer } from "./modules/hotification";
import { ButtonsSettings, Modal } from "./modules/base-settings";
import { Gems } from "./modules/states";

export function App() {
	return (
		<>
			<Layer>
				<NotificationContainer />
			</Layer>
			<Layer>
				<Radio />
			</Layer>
			<Layer>
				<Modal />
				<ButtonsSettings />
			</Layer>
			<Layer>
				<Gems />
			</Layer>
		</>
	);
}
