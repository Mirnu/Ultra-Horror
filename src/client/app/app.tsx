import Roact from "@rbxts/roact";
import { Layer } from "./ui/layer";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "./modules/hotification/store";
import { RemProvider } from "./shared/providers/rem-provider";
import { Notifications } from "./modules/hotification";
import { Radio } from "./modules/radio";

export function App() {
	return (
		<ReflexProvider producer={store}>
			<RemProvider>
				<Layer>
					<Notifications />
				</Layer>
				<Layer>
					<Radio />
				</Layer>
			</RemProvider>
		</ReflexProvider>
	);
}
