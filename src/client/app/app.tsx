import Roact from "@rbxts/roact";
import { GamePage } from "./pages/game-page";
import { Layer } from "./ui/layer";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "./modules/hotification/store";
import { RemProvider } from "./shared/providers/rem-provider";

export function App() {
	return (
		<ReflexProvider producer={store}>
			<RemProvider>
				<Layer>
					<GamePage />
				</Layer>
			</RemProvider>
		</ReflexProvider>
	);
}
