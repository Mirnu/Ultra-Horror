import { ReplicatedStorage, TweenService } from "@rbxts/services";
import { State } from "client/StateMachine/State";
import { LocalPlayer } from "client/utils";
import { GetCharacter } from "shared/utils/CharacterUtils";
import { addNotification } from "../notifications/NotificationFactory";

const dashTSInfo = new TweenInfo(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out);
const coolDown = 5;

export class DashState extends State {
	private character = this.playerController.Character;
	private humanoid = this.character.WaitForChild("Humanoid") as Humanoid;
	private humanoidRootPart = this.character.WaitForChild("HumanoidRootPart") as BasePart;
	private animator = this.humanoid.WaitForChild("Animator") as Animator;
	private isCoolDown = false;

	public Enter() {
		if (this.isCoolDown) return false;
		this.character = GetCharacter(LocalPlayer);
		this.humanoid = this.character.Humanoid;
		this.humanoidRootPart = this.character.HumanoidRootPart;
		this.animator = this.humanoid.WaitForChild("Animator") as Animator;

		this.isCoolDown = true;
		const animationTrack = this.animator.LoadAnimation(ReplicatedStorage.Prefabs.Animations.Dash.Dash);
		animationTrack.Play();

		const ts = TweenService.Create(this.character.HumanoidRootPart, dashTSInfo, {
			AssemblyLinearVelocity: this.humanoidRootPart.CFrame.LookVector.mul(80),
		});
		ts.Play();
		this.maid.GiveTask(
			ts.Completed.Connect(() => {
				if (this.playerController.LastState) {
					addNotification("PlayerTiredDash");
					const stateChanged = this.playerController.ChangeState(this.playerController.LastState);
					if (!stateChanged) this.playerController.ChangeState(this.playerController.WalkingState);
				}
			}),
		);

		return true;
	}
	public Exit(): void {
		this.maid.DoCleaning();
		task.delay(coolDown, () => (this.isCoolDown = false));
	}
	public Update(): void {}
}
