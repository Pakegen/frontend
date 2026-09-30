export type CarteLibrairie = {
	"Full ID": number;
	"Short ID": number;
	Name: string;
	Type: string;
	Tag: string;
	Strength: number;
	Play_target: string;
	Played: boolean;
	Battlecry: boolean;
	Graveyard: boolean;
	"End Turn": boolean;
	"End Round": boolean;
	"Card Desciption": string;
};

export type VueJoueur = {
	Client_Player_Number: 1 | 2;
	Game_Phase: string;
	Round_number: number;
	Turn_number: number;
	Active_Player: number;
	Active_Opponent: number;
	Mulligan: boolean;

	Player_1_Crown: number;
	Player_1_has_passed: boolean;
	Player_1_Hand?: number[];
	Player_1_Front_Row: number[];
	Player_1_Back_Row: number[];
	Player_1_Graveyard: number[];
	Player_1_Front_Row_Strength: number;
	Player_1_Back_Row_Strength: number;
	Player_1_Board_Strength: number;
	Player_1_Hand_Number?: number;
	Player_1_Deck_Number?: number;

	Player_2_Crown: number;
	Player_2_has_passed: boolean;
	Player_2_Hand?: number[];
	Player_2_Front_Row: number[];
	Player_2_Back_Row: number[];
	Player_2_Graveyard: number[];
	Player_2_Front_Row_Strength: number;
	Player_2_Back_Row_Strength: number;
	Player_2_Board_Strength: number;
	Player_2_Hand_Number?: number;
	Player_2_Deck_Number?: number;

	Available_Commands: Record<string, string[]>;

	Winner: number;
	End_Reason: string;
};