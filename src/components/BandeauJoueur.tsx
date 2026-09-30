import { couleurs } from "../theme";
import type { CarteData } from "../types";

export function BandeauJoueur({ pseudo, manchesGagnees, aPasse, nbCartesPioche, nbCartesMain, cimetiere, onCimetiereClick }: {
	pseudo: string;
	manchesGagnees: number;
	aPasse: boolean;
	nbCartesPioche: number;
	nbCartesMain: number;
	cimetiere: CarteData[];
	onCimetiereClick?: () => void;
}) {
	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			gap: 12,
			padding: 8,
			background: couleurs.panneau,
			borderRadius: 6,
			fontSize: 12,
			color: couleurs.texteDoux
		}}>
			<div style={{
				width: 32,
				height: 32,
				borderRadius: "50%",
				background: couleurs.bordure,
				flexShrink: 0
			}} />

			<div style={{ flex: 1 }}>
				<div style={{ color: couleurs.texteClair, fontSize: 13 }}>{pseudo}</div>
				{aPasse && <div style={{ color: couleurs.erreur, fontSize: 10 }}>a passé</div>}
			</div>

			<div style={{ display: "flex", gap: 4 }}>
				{[0, 1].map((i) => (
					<div key={i} style={{
						width: 12,
						height: 12,
						borderRadius: "50%",
						background: i < manchesGagnees ? couleurs.or : couleurs.inactif,
						border: `1px solid ${couleurs.desactive}`
					}} />
				))}
			</div>

			<div>Main : {nbCartesMain}</div>
			<div>Pioche : {nbCartesPioche}</div>

			<div
				onClick={onCimetiereClick}
				style={{
					padding: "4px 8px",
					background: couleurs.champ,
					border: `1px solid ${couleurs.bordure}`,
					borderRadius: 4,
					cursor: cimetiere.length > 0 ? "pointer" : "default"
				}}
			>
				Cimetière : {cimetiere.length}
			</div>
		</div>
	);
}