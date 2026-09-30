export type LigneRangee = "melee" | "distance";

export type CarteData = {
	id: number;
	nom: string;
	force: number;
	categorie: string;
	rangees: LigneRangee[];
}

export type Joueur = {
	pseudo: string;
	manchesGagnees: number;
	aPasse: boolean;
	nbCartesPioche: number;
	cimetiere: CarteData[];
	melee: CarteData[];
	distance: CarteData[];
}

export type EtatPartie = {
	manche: number;
	monTour: boolean;
	adversaire: Joueur & { nbCartesMain: number };
	moi: Joueur;
	main: CarteData[];
}