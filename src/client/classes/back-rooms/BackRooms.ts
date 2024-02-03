import { Components } from "@flamework/components";
import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { LightComponent } from "client/components/LightComponent";
import { LocalPlayer } from "client/utils";
import { GetCharacter, GetCharacterCFrame } from "shared/utils/CharacterUtils";

const lights: light[] = [];

const isCloser = (character: Character, p2: BasePart) => {
	return GetCharacterCFrame(character).Position.sub(p2.Position).Magnitude < 100;
};

export class BackRooms {
	constructor(private components: Components) {}

	public generate() {
		for (let x = -50; x < 49; x++) {
			task.spawn(() => {
				for (let y = -50; y < 49; y++) {
					if (math.random(1, 5) === 1) this.CreateLight(x * 10, y * 10);
				}
			});
		}

		this.optimize(GetCharacter(LocalPlayer));
	}

	private addLightComponent(light: light) {
		if (!this.components.getComponent<LightComponent>(light)) {
			this.components.addComponent<LightComponent>(light);
		}
	}

	private removeLightComponent(light: light) {
		if (this.components.getComponent<LightComponent>(light)) {
			this.components.removeComponent<LightComponent>(light);
		}
	}

	private optimize(character: Character) {
		RunService.Heartbeat.Connect(() => {
			lights.forEach((light) => {
				isCloser(character, light) ? this.addLightComponent(light) : this.removeLightComponent(light);
			});
		});
	}

	public CreateLight(x: number, y: number) {
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
}
