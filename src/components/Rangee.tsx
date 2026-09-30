import type { CarteData } from "../types";
import { Carte } from "./Carte";

export function Rangee({cartes, label, onClick, active, onCarteClick }: {
	cartes: CarteData[]; 
	label: string;
	onClick?: () => void;
	active?: boolean;
	onCarteClick?: (carte: CarteData) => void;
}) {
	const score = cartes.reduce((total, c) => total + c.force, 0);
	
	return (
		<div onClick={onClick} style = {{
			display: "flex",
			alignItems: "center",
			gap: 8,
			background: active ? "#2f3a2f" : "#252525",
			border: active ? "1px solid #7a9a6a" : "1px solid #444",
			borderRadius: 6,
			padding: 8,
			minHeight: 116,
			cursor: active ? "pointer" : "default"
		}}>
			<div style={{
				width: 44,
				flexShrink: 0,
				textAlign: "center"
			}}>
				<div style={{ fontSize: 22, fontWeight: "bold", color: "#b8860b"}}>{score}</div>
				<div style={{ fontSize: 8, color: "#888"}}>{label}</div>
			</div>

			<div style={{ display: "flex", gap: 6, overflowX: "auto"}}>
				{cartes.map((c) => (
					<Carte key={c.id} nom={c.nom} force={c.force} categorie={c.categorie} onClick={onCarteClick ? () => onCarteClick(c) : undefined} />
				))}
				</div>
			</div>
	);
}
