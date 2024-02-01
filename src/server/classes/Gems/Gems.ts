import { Components } from "@flamework/components";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { GemComponent } from "server/components/GemComponent";

const gemPrefab = ReplicatedStorage.Prefabs.WaitForChild("Meshes").WaitForChild("Gem") as MeshPart;

export class Gems {
	constructor(private components: Components) {}

	public Init() {
		const seed = new Random().NextNumber(1, 100000);

		for (let x = -50; x < 49; x++) {
			task.spawn(() => {
				for (let y = -50; y < 49; y++) {
					if (x > -4 && x < 4 && y > -4 && y < 4) continue;
					const noise = math.noise(seed, x / 2, y / 2);
					if (noise > 0.05) {
						this.createGem(x * 10, y * 10);
					}
				}
			});
		}
	}

	private createGem(x: number, y: number) {
		const gem = gemPrefab.Clone();
		gem.Anchored = true;
		gem.CanCollide = false;
		gem.CFrame = new CFrame(x, 4, y);
		this.components.addComponent<GemComponent>(gem);
		gem.Parent = Workspace;

		gem.Destroying.Connect(() => {
			task.delay(math.random(10, 30), () => {
				this.createGem(x, y);
			});
		});
	}
}
