import Roact from "@rbxts/roact";
import { GamePage } from "./pages/game-page";
import { Layer } from "./ui/layer";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "./modules/hotification/store";

export function App() {
	return (
		<ReflexProvider producer={store}>
			<Layer>
				<GamePage />
			</Layer>
		</ReflexProvider>
	);
}
