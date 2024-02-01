import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";

const minIntensity = 0.65;
const maxIntensity = 0.8;

interface light extends Part {
	SpotLight: SpotLight;
}

const lights: light[] = [];

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
					if (math.random(1, 5) === 1) this.createLight(x * 10, y * 10);
					if (x > -4 && x < 4 && y > -4 && y < 4) continue;
					const noise = math.noise(seed, x / 2, y / 2);
					if (noise > 0.05) {
						this.createWall(x, y);
					}
				}
			});
		}

		RunService.Heartbeat.Connect(() => {
			lights.forEach((part) => {
				const flickerIntensity = math.random(minIntensity * 100, maxIntensity * 100) / 100;
				part.Color = new Color3(flickerIntensity, flickerIntensity, flickerIntensity);
				part.SpotLight.Brightness = flickerIntensity;
				part.SpotLight.Brightness = flickerIntensity;
			});
		});
	}

	private createCeiling() {
		const ceil = new Instance("Part");
		ceil.Anchored = true;
		ceil.Size = new Vector3(1000, 1, 1000);
		ceil.CFrame = new CFrame(0, 15.5, 0);

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

		if (math.random(1, 2) === 2) {
			part.Size = new Vector3(math.random(5, 20), 15, 1);
		} else {
			part.Size = new Vector3(1, 15, math.random(5, 20));
		}
		part.CFrame = new CFrame(x * 10, 7.5, y * 10);
		this.textureWall(part);
		part.Parent = Workspace;
	}

	private createLight(x: number, y: number) {
		const part = new Instance("Part") as light;
		part.Anchored = true;
		part.Material = Enum.Material.Neon;
		part.Color = new Color3(1, 1, 1);
		part.Size = new Vector3(4, 0.5, 3);
		part.CFrame = new CFrame(new Vector3(x, 14.75, y));
		part.CFrame = part.CFrame.mul(CFrame.Angles(0, math.rad(math.random(1, 2) === 1 ? 90 : 0), 0));

		const sound = ReplicatedStorage.Prefabs.Sound.light.Clone();
		sound.Parent = part;

		const light = new Instance("SpotLight");
		light.Angle = 120;
		light.Brightness = 1;
		light.Range = 30;
		light.Shadows = true;
		light.Face = Enum.NormalId.Bottom;
		light.Parent = part;
		part.Parent = Workspace;
		lights.push(part);
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
