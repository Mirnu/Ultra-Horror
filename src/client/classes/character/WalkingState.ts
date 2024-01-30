import { UserInputService } from "@rbxts/services";
import { State } from "client/StateMachine/State";
import { LocalPlayer } from "client/utils";
import { GetCharacter } from "shared/utils/CharacterUtils";

export class WalkingState extends State {
	public Enter() {
		GetCharacter(LocalPlayer).Humanoid.WalkSpeed = 25;

		this.maid.GiveTask(
			UserInputService.InputBegan.Connect((input) => {
				if (input.KeyCode === Enum.KeyCode.LeftShift) {
					this.playerController.ChangeState(this.playerController.RunningState);
				} else if (input.KeyCode === Enum.KeyCode.Q) {
					this.playerController.ChangeState(this.playerController.DashState);
				}
			}),
		);
		return true;
	}
	public Exit(): void {
		this.maid.DoCleaning();
	}
	public Update(): void {}
}
