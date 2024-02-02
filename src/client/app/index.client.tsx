import { createPortal, createRoot } from "@rbxts/react-roblox";
import Roact, { StrictMode } from "@rbxts/roact";
import { LocalPlayer } from "client/utils";
import { App } from "./app";
import { ReflexProvider } from "@rbxts/react-reflex";
import { RemProvider } from "./shared/providers/rem-provider";
import { store } from "client/store";

const root = createRoot(new Instance("Folder"));
const target = LocalPlayer.WaitForChild("PlayerGui");

root.render(
	createPortal(
		<StrictMode>
			<ReflexProvider producer={store}>
				<RemProvider>
					<App key="app" />
				</RemProvider>
			</ReflexProvider>
		</StrictMode>,
		target,
	),
);
