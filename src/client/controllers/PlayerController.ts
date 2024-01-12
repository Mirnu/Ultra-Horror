import { Components } from "@flamework/components";
import { Service, OnStart, Controller } from "@flamework/core";
import { LocalPlayer } from "client/utils";

@Controller({})
export class PlayerController implements OnStart {
	constructor(private components: Components) {}

	onStart() {
		this.components.addComponent<MovementComponent>(LocalPlayer);
	}
}
