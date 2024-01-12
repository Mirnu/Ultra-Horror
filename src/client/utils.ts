import { Players } from "@rbxts/services";

export const LocalPlayer = Players.LocalPlayer;
export const Character = (LocalPlayer.Character ?? LocalPlayer.CharacterAdded.Wait()[0]) as Character;
