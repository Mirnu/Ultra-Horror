import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { EnemyComponent } from "./EnemyComponent";
import { ReplicatedStorage } from "@rbxts/services";

@Component({
	tag: "Chipi",
})
export class ChipiComponent extends EnemyComponent<Chipi> implements OnStart {
	onStart(): void {
		task.spawn(() => {
			const decals = ReplicatedStorage.Prefabs.Enemies.Chipi.Decals;
			const size = decals.GetChildren().size();
			while (task.wait()) {
				for (let i = 1; i < size; i++) {
					const decal = decals.FindFirstChild(tostring(i)) as Decal;
					if (decal) {
						this.instance.HumanoidRootPart.Attachment.BillboardGui.ImageLabel.Image = decal.Texture;
					}
					task.wait(1 / size);
				}
			}
		});
		this.Start();
	}
}
