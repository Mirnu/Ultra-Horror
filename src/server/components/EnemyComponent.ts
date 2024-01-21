import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { PathfindingService, Players } from "@rbxts/services";
import { GetCharacter, GetCharacterCFrame } from "shared/Utils";

interface Attributes {}
@Component({
	tag: "Enemy",
})
export class EnemyComponent<I extends Enemy> extends BaseComponent<Attributes, I> implements OnStart {
	onStart(): void {
		this.Start();
	}

	public Start() {
		while (task.wait(0.01)) {
			const nearestCharacter = this.getNearestPlayer();
			if (nearestCharacter) this.Attack(GetCharacterCFrame(GetCharacter(nearestCharacter)));
		}
	}

	private Attack(destitanation: CFrame) {
		const path = PathfindingService.CreatePath({ Costs: { SafeZone: math.huge } });
		path.ComputeAsync(this.instance.HumanoidRootPart.CFrame.Position, destitanation.Position);
		const waypoints = path.GetWaypoints();
		if (waypoints.size() > 0) {
			waypoints.forEach((waypoint) => {
				this.instance.Nextbot.MoveTo(waypoint.Position);
				this.instance.Nextbot.MoveToFinished.Wait();
			});
		}
	}

	private getNearestPlayer() {
		const players = Players.GetPlayers();
		if (players.size() === 0) return;
		let closerPlayer = players[0];
		let distanceCloserPlayer = GetCharacterCFrame(GetCharacter(players[0])).Position.sub(
			this.instance.HumanoidRootPart.CFrame.Position,
		).Magnitude;
		if (distanceCloserPlayer < 5) GetCharacter(closerPlayer).Humanoid.Health = 0;

		for (let i = 1; i < players.size(); i++) {
			const lenght = GetCharacterCFrame(GetCharacter(players[i])).Position.sub(
				this.instance.HumanoidRootPart.CFrame.Position,
			).Magnitude;

			if (lenght < 15) {
				GetCharacter(players[i]).Humanoid.Health = 0;
				continue;
			}

			if (lenght < distanceCloserPlayer) {
				closerPlayer = players[i];
				distanceCloserPlayer = lenght;
			}
		}
		return closerPlayer;
	}
}
