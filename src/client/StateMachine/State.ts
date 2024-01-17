import Maid from "@rbxts/maid";
import { PlayerController } from "client/controllers/PlayerController";

export abstract class State {
	protected maid = new Maid();

	constructor(protected readonly playerController: PlayerController) {}

	public abstract Enter(): boolean;
	public abstract Exit(): void;
	public abstract Update(delta: number): void;
}
