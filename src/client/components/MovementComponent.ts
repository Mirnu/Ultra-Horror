import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { UserInputService } from "@rbxts/services";
import { GetCharacter } from "shared/Utils";
import { LocalPlayer } from "client/utils";

interface Attributes {}

@Component({})
export class MovementComponent extends BaseComponent<Attributes> implements OnStart {
	onStart() {
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) {
				if (input.KeyCode === Enum.KeyCode.LeftShift) this.run();
			}
		});
		UserInputService.InputEnded.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.LeftShift) this.walk();
		});
	}

	private run() {
		GetCharacter(LocalPlayer).Humanoid.WalkSpeed *= 1.5;
	}

	private walk() {
		GetCharacter(LocalPlayer).Humanoid.WalkSpeed /= 1.5;
	}
}
