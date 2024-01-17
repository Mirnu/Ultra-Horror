import { Components } from "@flamework/components";
import { OnStart, Controller, OnTick } from "@flamework/core";
import { Constructor } from "@flamework/core/out/utility";
import { State } from "client/StateMachine/State";
import { DashState } from "client/classes/character/DashState";
import { RunningState } from "client/classes/character/RunningState";
import { WalkingState } from "client/classes/character/WalkingState";
import { LocalPlayer } from "client/utils";
import { GetCharacter } from "shared/Utils";
import { CharacterState } from "shared/types/CharacterState";

const states = {
	[CharacterState.dash]: DashState,
	[CharacterState.running]: RunningState,
	[CharacterState.walking]: WalkingState,
} satisfies Record<CharacterState, Constructor<State>>


@Controller({})
export class PlayerController implements OnStart, OnTick {
	public Character!: Character;
	public DashState!: DashState;
	public RunningState!: RunningState
	public WalkingState!: WalkingState

	public CurrentState?: State;
	public LastState?: State

	onStart() {
		this.Character = GetCharacter(LocalPlayer)
		
		this.DashState = new DashState(this)
		this.RunningState = new RunningState(this)
		this.WalkingState = new WalkingState(this)
		
		this.Initialize(this.WalkingState)
	}

	onTick(dt: number): void {
		this.CurrentState?.Update(dt)
	}

	public Initialize(startState: State) {
		this.CurrentState = startState;
		this.CurrentState.Enter();
	}

	public ChangeState(newState: State) {
		const entered = newState.Enter() as unknown as boolean;
		if (!entered) return entered
		this.CurrentState?.Exit();
		this.LastState = this.CurrentState
		this.CurrentState = newState;
		return true
	}
}
