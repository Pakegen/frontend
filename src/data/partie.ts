import type { EtatPartie } from "../types";

export const partieInitiale: EtatPartie = {
	manche: 1,
	monTour: true,
	adversaire: {
		pseudo: "J.R Martin",
		manchesGagnees: 0,
		aPasse: false,
		nbCartesMain: 6,
		nbCartesPioche: 12,
		cimetiere: [],
		distance: [{id : 1, nom: "Catapulte", force: 8, categorie: "troupe", rangees: ["distance"]}],
		melee: [
			{id: 2, nom: "Vesemir", force: 4, categorie: "hero", rangees: ["melee", "distance"]},
			{id: 3, nom:"Lambert", force: 6, categorie:"hero", rangees: ["melee"]},
		]
	},
	moi: {
		pseudo: "J.k Rowling",
		manchesGagnees: 1,
		aPasse: false,
		nbCartesPioche:10,
		cimetiere: [],
		melee: [{id: 4, nom: "Gerarlt De Riv", force: 9, categorie: "hero", rangees: ["melee"]}],
		distance: [{id: 5, nom: "Archer Elfe", force: 3, categorie: "troupe", rangees: ["distance"]}],
	},
	main: [
		{ id: 6, nom: "Yennefer", force: 7, categorie: "hero", rangees: ["melee"] },
		{ id: 7, nom: "Arthur", force: 11, categorie: "hero", rangees: ["melee"] },
		{ id: 8, nom: "Bengirama", force: 2, categorie: "magie", rangees: ["melee", "distance"] },
		{ id: 9, nom: "test", force: 2, categorie: "troupe", rangees: ["distance"] },
	]
};