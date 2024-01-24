interface Enemy extends Model {
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
