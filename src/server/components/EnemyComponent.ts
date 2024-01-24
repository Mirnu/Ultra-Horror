import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { PathfindingService, Players, TweenService } from "@rbxts/services";
import { GetCharacter, GetCharacterCFrame } from "shared/Utils";
import { PlayerService } from "server/services/PlayerService";

const distanceKill = 10;

interface Attributes {}
@Component({
	tag: "Enemy",
})
export class EnemyComponent<I extends Enemy> extends BaseComponent<Attributes, I> implements OnStart {
	constructor(private playerService: PlayerService) {
		super();
	}

	public Speed = 200;

	onStart(): void {
		this.Start();
	}

	public Start() {
		while (task.wait(0.01)) {
			const nearestCharacter = this.getNearestPlayer();
			if (nearestCharacter && !this.playerService.SafeZone.findPlayer(nearestCharacter)) {
				print(this.playerService.SafeZone.findPlayer(nearestCharacter));
				this.Attack(GetCharacterCFrame(GetCharacter(nearestCharacter)));
			}
		}
	}

	private Attack(destitanation: CFrame) {
		const path = PathfindingService.CreatePath({ Costs: { SafeZone: math.huge } });
		path.ComputeAsync(this.instance.HumanoidRootPart.CFrame.Position, destitanation.Position);
		const waypoints = path.GetWaypoints();
		if (waypoints.size() > 0) {
			const vectorValue = new Instance("Vector3Value");
			vectorValue.Changed.Connect((value) => {
				this.instance.PivotTo(
					new CFrame(new Vector3(value.X, value.Y + 5.93, value.Z), destitanation.Position),
				);
			});
			waypoints.forEach((waypoint) => {
				const ts = TweenService.Create(
					vectorValue,
					new TweenInfo(this.instance.GetPivot().Position.sub(waypoint.Position).Magnitude / this.Speed),
					{ Value: waypoint.Position },
				);
				ts.Play();
				ts.Completed.Wait();
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
		if (distanceCloserPlayer < distanceKill) GetCharacter(closerPlayer).Humanoid.Health = 0;

		for (let i = 1; i < players.size(); i++) {
			const lenght = GetCharacterCFrame(GetCharacter(players[i])).Position.sub(
				this.instance.HumanoidRootPart.CFrame.Position,
			).Magnitude;
			if (lenght < distanceKill) {
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
