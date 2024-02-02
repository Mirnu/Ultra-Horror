import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players, TweenService } from "@rbxts/services";
import { store } from "server/store";

interface Attributes {}

@Component({})
export class GemComponent extends BaseComponent<Attributes, MeshPart> implements OnStart {
	onStart() {
		task.delay(math.random(1, 5), () => this.animate());
		this.touchHandle();
	}

	private animate() {
		const ts = TweenService.Create(
			this.instance,
			new TweenInfo(1, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 999999999, true),
			{ CFrame: this.instance.CFrame.sub(new Vector3(0, 2, 0)) },
		);
		ts.Play();
	}

	private touchHandle() {
		const connect = this.instance.Touched.Connect((other) => {
			const model = other.FindFirstAncestorOfClass("Model");
			if (!model) return;
			const player = Players.GetPlayerFromCharacter(model);
			if (!player) return;
			connect.Disconnect();
			store.givePlayerGems(player.Name, 1);
			this.instance.Destroy();
		});
	}
}
