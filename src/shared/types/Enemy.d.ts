interface Enemy extends Model {
	Nextbot: Humanoid;
	HumanoidRootPart: BasePart;
}

interface Chipi extends Enemy {
	HumanoidRootPart: Part & {
		Attachment: Attachment & {
			BillboardGui: BillboardGui & {
				ImageLabel: ImageLabel;
			};
		};
	};
}
