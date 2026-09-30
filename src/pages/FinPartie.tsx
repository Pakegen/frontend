import { useNavigate, useLocation } from "react-router-dom";
import { couleurs, styleBouton } from "../theme";

type Resultat = "victoire" | "defaite" | "egalite";

type EtatFin = {
	resultat: Resultat;
	adversaire: string | null;
	couronnesMoi: number;
	couronnesAdversaire: number;
	eloAvant: number | null;
	eloApres: number | null;
	raison: string;
};

const defaut: EtatFin = {
	resultat: "victoire",
	adversaire: "geralt42",
	couronnesMoi: 2,
	couronnesAdversaire: 1,
	eloAvant: 1000,
	eloApres: 1234,
	raison: "Crowns"
};

function FinPartie() {
	const navigate = useNavigate();
	const location = useLocation();
	const etat = (location.state as EtatFin) ?? defaut;

	const titres = {
		victoire: "Victoire",
		defaite: "Défaite",
		egalite: "Égalité"
	};

	const couleursResultat = {
		victoire: couleurs.or,
		defaite: couleurs.erreur,
		egalite: couleurs.texteDoux
	};

	const ecart =
		etat.eloAvant !== null && etat.eloApres !== null
			? etat.eloApres - etat.eloAvant
			: null;

	return (
		<div style={{ maxWidth: 380, margin: "100px auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 24 }}>
			<h1 style={{ color: couleursResultat[etat.resultat], fontSize: 40, margin: 0 }}>
				{titres[etat.resultat]}
			</h1>

			{etat.raison === "Concede" && (
				<div style={{ fontSize: 13, color: couleurs.texteDoux }}>
					{etat.resultat === "victoire" ? "Votre adversaire a abandonné." : "Vous avez abandonné."}
				</div>
			)}

			<div style={{ padding: 20, background: couleurs.panneau, borderRadius: 8 }}>
				<div style={{ fontSize: 12, color: couleurs.texteDoux, marginBottom: 8 }}>Manches</div>
				<div style={{ fontSize: 32, color: couleurs.texte }}>
					{etat.couronnesMoi} <span style={{ color: couleurs.texteDiscret, fontSize: 20 }}>—</span> {etat.couronnesAdversaire}
				</div>
				<div style={{ fontSize: 12, color: couleurs.texteDiscret, marginTop: 8 }}>
					contre {etat.adversaire ?? "l'IA"}
				</div>
			</div>

			{ecart === null ? (
				<div style={{ fontSize: 12, color: couleurs.texteDiscret }}>
					Les parties contre l'IA ne comptent pas au classement.
				</div>
			) : (
				<div style={{ padding: 16, background: couleurs.panneau, borderRadius: 8 }}>
					<div style={{ fontSize: 12, color: couleurs.texteDoux, marginBottom: 6 }}>Classement ELO</div>
					<div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10 }}>
						<span style={{ fontSize: 16, color: couleurs.texteDiscret }}>{etat.eloAvant}</span>
						<span style={{ color: couleurs.texteDiscret }}>→</span>
						<span style={{ fontSize: 28, fontWeight: "bold", color: couleurs.or }}>{etat.eloApres}</span>
						<span style={{ fontSize: 15, color: ecart > 0 ? "#6a6" : ecart < 0 ? couleurs.erreur : couleurs.texteDoux }}>
							{ecart > 0 ? `+${ecart}` : ecart}
						</span>
					</div>
				</div>
			)}

			<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
				<button onClick={() => navigate("/combat")} style={styleBouton(false)}>
					Rejouer
				</button>
				<button
					onClick={() => navigate("/menu")}
					style={{ background: "none", border: "none", color: couleurs.texteDiscret, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
				>
					Retour au menu
				</button>
			</div>
		</div>
	);
}

export default FinPartie;