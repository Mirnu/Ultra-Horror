import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { PathfindingService, Players, RunService } from "@rbxts/services";
import { GetCharacter, GetCharacterCFrame } from "shared/Utils";

interface Attributes {}

@Component()
export class FreddyComponent extends BaseComponent<Attributes, Enemy> implements OnStart {
	onStart() {
		this.instance.Nextbot.MoveTo(new Vector3(100, 0, 100));
		task.wait(5);
		RunService.Heartbeat.Connect(() => {
			const nearestCharacter = this.getNearestPlayer();
			if (nearestCharacter) this.Attack(GetCharacterCFrame(GetCharacter(nearestCharacter)));
		});
	}

	private Attack(destitanation: CFrame) {
		const path = PathfindingService.CreatePath();
		path.ComputeAsync(this.instance.GetPivot().Position, destitanation.Position);
		const waypoints = path.GetWaypoints();
		if (waypoints.size() > 0) {
			waypoints.forEach((waypoint) => {
				this.instance.Nextbot.MoveTo(waypoint.Position);
				this.instance.Nextbot.MoveToFinished.Wait();
			});
		} else {
			this.instance.Nextbot.MoveTo(destitanation.Position);
		}
	}

	private getNearestPlayer() {
		const players = Players.GetPlayers();
		if (players.size() === 0) return;
		let closerPlayer = players[0];
		let distanceCloserPlayer = GetCharacterCFrame(GetCharacter(players[0])).Position.sub(
			this.instance.GetPivot().Position,
		).Magnitude;
		if (distanceCloserPlayer < 5) GetCharacter(closerPlayer).Humanoid.Health = 0;

		for (let i = 1; i < players.size(); i++) {
			const lenght = GetCharacterCFrame(GetCharacter(players[i])).Position.sub(
				this.instance.GetPivot().Position,
			).Magnitude;

			if (lenght < 5) {
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
