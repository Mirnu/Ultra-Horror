import Roact from "@rbxts/roact";

interface LayerProps extends Roact.PropsWithChildren {
	displayOrder?: number;
}

export function Layer({ displayOrder, children }: LayerProps) {
	return (
		<screengui ResetOnSpawn={false} DisplayOrder={displayOrder} IgnoreGuiInset ZIndexBehavior={"Sibling"}>
			{children}
		</screengui>
	);
}
