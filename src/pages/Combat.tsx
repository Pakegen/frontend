import { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { couleurs, styleBouton } from "../theme";

type Mode = "ia" | "humain";
type Faction = "Witcher" | "Wild_Hunt";

const factions: { valeur: Faction; ecrit: string }[] = [
	{ valeur: "Witcher", ecrit: "Witcher" },
	{ valeur: "Wild_Hunt", ecrit: "Wild Hunt" }
];

function Combat() {
	const [mode, setMode] = useState<Mode | null>(null);
	const [faction, setFaction] = useState<Faction>("Witcher");
	const navigate = useNavigate();

	function lancer() {
		if (mode === "ia")
			navigate("/jeu");
		else if (mode === "humain")
			navigate("/attente", { state: { faction } });
	}

	function styleChoix(actif: boolean): CSSProperties {
		return {
			flex: 1,
			padding: "20px 12px",
			background: actif ? couleurs.carte : couleurs.panneau,
			border: `2px solid ${actif ? couleurs.or : couleurs.bordure}`,
			borderRadius: 8,
			color: actif ? couleurs.or : couleurs.texteDoux,
			fontSize: 15,
			fontWeight: "bold",
			cursor: "pointer",
			fontFamily: "inherit"
		};
	}

	return (
		<div style={{ maxWidth: 400, margin: "80px auto", display: "flex", flexDirection: "column", gap: 20 }}>
			<button
				onClick={() => navigate("/menu")}
				style={{ alignSelf: "flex-start", background: "none", border: "none", color: couleurs.or, fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "inherit" }}
			>
				← Menu
			</button>

			<h1 style={{ color: couleurs.or, textAlign: "center", margin: 0 }}>Combat</h1>

			<div style={{ display: "flex", gap: 12 }}>
				<button
					onClick={() => setMode("ia")}
					aria-pressed={mode === "ia"}
					style={styleChoix(mode === "ia")}
				>
					Contre l'IA
				</button>
				<button
					onClick={() => setMode("humain")}
					aria-pressed={mode === "humain"}
					style={styleChoix(mode === "humain")}
				>
					Contre un joueur
				</button>
			</div>

			<div>
				<div style={{ fontSize: 12, color: couleurs.texteDoux, marginBottom: 8 }}>Faction</div>
				<div style={{ display: "flex", gap: 8 }}>
					{factions.map((f) => (
						<button
							key={f.valeur}
							onClick={() => setFaction(f.valeur)}
							aria-pressed={faction === f.valeur}
							style={{ ...styleChoix(faction === f.valeur), padding: 12, fontSize: 14 }}
						>
							{f.ecrit}
						</button>
					))}
				</div>
			</div>

			<button
				onClick={lancer}
				disabled={mode === null}
				style={styleBouton(mode === null)}
			>
				{mode === "humain" ? "Chercher un adversaire" : "Lancer la partie"}
			</button>
		</div>
	);
}

export default Combat;