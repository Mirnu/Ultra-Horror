import Roact from "@rbxts/roact";
import { Layer } from "../components/ui/layer";
import { Game } from "../components/game/game";

export function App() {
	return (
		<Layer>
			<Game></Game>
		</Layer>
	);
}
