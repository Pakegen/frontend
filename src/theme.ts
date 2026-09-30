import type { CSSProperties } from "react";

export const couleurs = {
	or: "#b8860b",
	fond: "#1a1a1a",
	panneau: "#1f1f1f",
	champ: "#252525",
	carte: "#3a3a3a",
	bordure: "#444",
	texte: "#eee",
	texteClair: "#ddd",
	texteDoux: "#aaa",
	texteDiscret: "#888",
	erreur: "#c66",
	inactif: "#333",
	desactive: "#555",
	fondDesactive: "#2a2a2a"
};
export const styleChamp: CSSProperties = {
	width: "100%",
	padding: 10,
	background: couleurs.champ,
	border: `1px solid ${couleurs.bordure}`,
	borderRadius: 6,
	color: couleurs.texte,
	fontSize: 14,
	fontFamily: "inherit",
	boxSizing: "border-box"
};

export const styleLabel: CSSProperties = {
	display: "block",
	fontSize: 12,
	color: couleurs.texteDoux,
	marginBottom: 4
};

export function styleBouton(desactive: boolean): CSSProperties {
	return {
		padding: 12,
		background: desactive ? couleurs.fondDesactive : couleurs.carte,
		color: desactive ? couleurs.desactive : couleurs.or,
		border: `2px solid ${couleurs.or}`,
		borderRadius: 8,
		fontSize: 14,
		fontWeight: "bold",
		cursor: desactive ? "default" : "pointer",
		fontFamily: "inherit"
	};
}