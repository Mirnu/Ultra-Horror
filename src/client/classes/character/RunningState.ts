import { UserInputService } from "@rbxts/services";
import { State } from "client/StateMachine/State";
import { LocalPlayer } from "client/utils";
import { GetCharacter } from "shared/Utils";

const maxFatigue = 5;

export class RunningState extends State {
	private fatigue = maxFatigue;

	public Enter() {
		if (this.fatigue <= 0) return false;
		this.maid.DoCleaning();
		GetCharacter(LocalPlayer).Humanoid.WalkSpeed = 40;

		this.maid.GiveTask(
			UserInputService.InputEnded.Connect((input) => {
				if (input.KeyCode === Enum.KeyCode.LeftShift) {
					this.playerController.ChangeState(this.playerController.WalkingState);
				}
			}),
		);
		this.maid.GiveTask(
			UserInputService.InputBegan.Connect((input) => {
				if (input.KeyCode === Enum.KeyCode.Q) {
					this.playerController.ChangeState(this.playerController.DashState);
				}
			}),
		);
		return true;
	}
	public Exit(): void {
		this.maid.DoCleaning();
		this.maid.GiveTask(
			task.spawn(() => {
				while (this.fatigue < maxFatigue) {
					task.wait(1);
					this.fatigue += 1;
				}
			}),
		);
	}

	public Update(dt: number): void {
		this.fatigue -= dt;
		if (this.fatigue <= 0) this.playerController.ChangeState(this.playerController.WalkingState);
	}
}
