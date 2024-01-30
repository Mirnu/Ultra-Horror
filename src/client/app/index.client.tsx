import { createPortal, createRoot } from "@rbxts/react-roblox";
import Roact, { StrictMode } from "@rbxts/roact";
import { LocalPlayer } from "client/utils";
import { App } from "./app";

const root = createRoot(new Instance("Folder"));
const target = LocalPlayer.WaitForChild("PlayerGui");

root.render(
	createPortal(
		<StrictMode>
			<App key="app" />
		</StrictMode>,
		target,
	),
);
