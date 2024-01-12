export const GetCharacter = (player: Player) => {
	return (player.Character ?? player.CharacterAdded.Wait()[0]) as Character;
};

export const GetCharacterCFrame = (character: Character) => {
	return character.HumanoidRootPart.CFrame;
};
