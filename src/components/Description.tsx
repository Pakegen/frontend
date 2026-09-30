import type { CarteData } from "../types";

export function Description({ carte }: { carte?: CarteData }) {
	return (
		<div style={{
			width: 160,
			flexShrink: 0,
			background: "#1f1f1f",
			border: "1px solid #444",
			borderRadius: 8,
			padding: 12,
			fontSize: 12,
			color: "#ccc",
			alignSelf: "flex-start",
		}}>
			{carte ? (
				<>
					<div style={{ fontSize: 15, fontWeight: "bold", color: "#b8860b", marginBottom: 8}}>{carte.nom}
					</div>
					<div style={{ marginBottom: 4 }}>Force : {carte.force}</div>
					<div style={{ marginBottom: 4 }}>Type : {carte.categorie}</div>
					<div>Rangee: {carte.rangees.join(", ")}</div>
				</>
			) : (
				<div style={{ color: "#666", fontStyle: "italic"}}>
					Selectionnez une carte pour voir sa description.
				</div>
			)}
		</div>
	);
}