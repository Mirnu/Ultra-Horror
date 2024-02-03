import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { RunService } from "@rbxts/services";

const minIntensity = 0.65;
const maxIntensity = 0.8;

interface Attributes {}

@Component({
	tag: "light",
})
export class LightComponent extends BaseComponent<Attributes, light> implements OnStart {
	private connect?: RBXScriptConnection;

	onStart(): void {
		this.flick();
	}

	destroy(): void {
		this.connect?.Disconnect();
	}

	private flick() {
		this.connect?.Disconnect();
		this.connect = RunService.Heartbeat.Connect(() => {
			const flickerIntensity = math.random(minIntensity * 100, maxIntensity * 100) / 100;
			this.instance.Color = new Color3(flickerIntensity, flickerIntensity, flickerIntensity);
			this.instance.SpotLight.Brightness = flickerIntensity;
			this.instance.SpotLight.Brightness = flickerIntensity;
		});
	}
}
