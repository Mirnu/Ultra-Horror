import Roact from "@rbxts/roact";
import { Layer } from "./ui/layer";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "./modules/hotification/store";
import { RemProvider } from "./shared/providers/rem-provider";
import { Radio } from "./modules/radio";
import { NotificationContainer } from "./modules/hotification";

export function App() {
	return (
		<ReflexProvider producer={store}>
			<RemProvider>
				<Layer>
					<NotificationContainer />
				</Layer>
				<Layer>
					<Radio />
				</Layer>
			</RemProvider>
		</ReflexProvider>
	);
}
