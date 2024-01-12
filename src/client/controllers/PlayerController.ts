import { Components } from "@flamework/components";
import { OnStart, Controller } from "@flamework/core";
import { MovementComponent } from "client/components/MovementComponent";
import { LocalPlayer } from "client/utils";

@Controller({})
export class PlayerController implements OnStart {
	constructor(private components: Components) {}

	onStart() {
		this.components.addComponent<MovementComponent>(LocalPlayer);
	}
}
