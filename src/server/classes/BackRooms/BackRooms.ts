import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";

export class BackRooms {
	public Init() {
		this.generate();
	}
	private generate() {
		const seed = new Random().NextNumber(1, 100000);
		this.createCeiling();

		for (let x = -50; x < 49; x++) {
			task.spawn(() => {
				for (let y = -50; y < 49; y++) {
					if (x > -4 && x < 4 && y > -4 && y < 4) continue;
					const noise = math.noise(seed, x / 2, y / 2);
					if (noise > 0.05) {
						this.createWall(x, y);
					}
				}
			});
		}
	}

	private createCeiling() {
		const ceil = new Instance("Part");
		ceil.Anchored = true;
		ceil.Size = new Vector3(1000, 1, 1000);
		ceil.CFrame = new CFrame(0, 15.5, 0);
		ceil.CanTouch = false;

		const texture = new Instance("Texture");
		texture.StudsPerTileU = 10;
		texture.StudsPerTileV = 10;
		texture.Texture = "http://www.roblox.com/asset/?id=9617551410";
		texture.Face = Enum.NormalId.Bottom;
		texture.Parent = ceil;
		ceil.Parent = Workspace;
	}

	private createWall(x: number, y: number) {
		const part = new Instance("Part");
		part.Anchored = true;
		part.CanTouch = false;

		if (math.random(1, 2) === 2) {
			part.Size = new Vector3(math.random(5, 20), 15, 1);
		} else {
			part.Size = new Vector3(1, 15, math.random(5, 20));
		}
		part.CFrame = new CFrame(x * 10, 7.5, y * 10);
		this.textureWall(part);
		part.Parent = Workspace;
	}

	private textureWall(wall: Part) {
		const textureID = "http://www.roblox.com/asset/?id=9290594165";
		const normals = [Enum.NormalId.Right, Enum.NormalId.Left, Enum.NormalId.Front, Enum.NormalId.Back];
		for (let index = 0; index < 4; index++) {
			const texture = new Instance("Texture");
			texture.StudsPerTileU = 10;
			texture.StudsPerTileV = 10;
			texture.Texture = textureID;
			texture.Face = normals[index];
			texture.Parent = wall;
		}
	}
}
