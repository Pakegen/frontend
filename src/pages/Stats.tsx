import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mesStats, historique, leaderboard } from "../api/stats";
import type { MesStats, PartieHistorique, LigneClassement } from "../api/stats";
import { couleurs } from "../theme";

type Onglet = "stats" | "historique" | "classement";

const onglets: { valeur: Onglet; titre: string }[] = [
	{ valeur: "stats", titre: "Mes stats" },
	{ valeur: "historique", titre: "Historique" },
	{ valeur: "classement", titre: "Classement" }
];

function Stats() {
	const [onglet, setOnglet] = useState<Onglet>("stats");
	const [stats, setStats] = useState<MesStats | null>(null);
	const [parties, setParties] = useState<PartieHistorique[]>([]);
	const [classement, setClassement] = useState<LigneClassement[]>([]);
	const [erreur, setErreur] = useState("");
	const [enCours, setEnCours] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		Promise.all([mesStats(), historique(20), leaderboard(20)])
			.then(([s, h, c]) => {
				setStats(s);
				setParties(h);
				setClassement(c);
			})
			.catch((err) => setErreur(err instanceof Error ? err.message : "Erreur."))
			.finally(() => setEnCours(false));
	}, []);

	function styleOnglet(actif: boolean) {
		return {
			flex: 1,
			padding: 10,
			background: actif ? couleurs.carte : couleurs.panneau,
			border: `1px solid ${actif ? couleurs.or : couleurs.bordure}`,
			borderRadius: 6,
			color: actif ? couleurs.or : couleurs.texteDoux,
			fontSize: 13,
			cursor: "pointer",
			fontFamily: "inherit"
		};
	}

	const styleCase = { padding: "8px 6px", borderBottom: `1px solid ${couleurs.bordure}`, textAlign: "left" as const };

	function date(iso: string) {
		return new Date(iso).toLocaleDateString("fr-FR");
	}

	return (
		<div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
			<button
				onClick={() => navigate("/menu")}
				style={{ alignSelf: "flex-start", background: "none", border: "none", color: couleurs.or, fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "inherit" }}
			>
				← Menu
			</button>

			<h1 style={{ color: couleurs.or, textAlign: "center", margin: 0 }}>Statistiques</h1>

			<div style={{ display: "flex", gap: 8 }}>
				{onglets.map((o) => (
					<button key={o.valeur} onClick={() => setOnglet(o.valeur)} aria-pressed={onglet === o.valeur} style={styleOnglet(onglet === o.valeur)}>
						{o.titre}
					</button>
				))}
			</div>

			{enCours && <div style={{ color: couleurs.texteDoux, textAlign: "center" }}>Chargement…</div>}
			{erreur && <div style={{ color: couleurs.erreur, textAlign: "center" }}>{erreur}</div>}

			{!enCours && !erreur && onglet === "stats" && stats && (
				<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
					<div style={{ textAlign: "center", padding: 16, background: couleurs.panneau, borderRadius: 8 }}>
						<div style={{ fontSize: 12, color: couleurs.texteDoux }}>Classement ELO</div>
						<div style={{ fontSize: 36, fontWeight: "bold", color: couleurs.or }}>{stats.elo}</div>
					</div>

					<div style={{ display: "flex", gap: 8, textAlign: "center" }}>
						<div style={{ flex: 1, padding: 12, background: couleurs.panneau, borderRadius: 8 }}>
							<div style={{ fontSize: 22, color: couleurs.texte }}>{stats.wins}</div>
							<div style={{ fontSize: 11, color: couleurs.texteDoux }}>victoires</div>
						</div>
						<div style={{ flex: 1, padding: 12, background: couleurs.panneau, borderRadius: 8 }}>
							<div style={{ fontSize: 22, color: couleurs.texte }}>{stats.losses}</div>
							<div style={{ fontSize: 11, color: couleurs.texteDoux }}>défaites</div>
						</div>
						<div style={{ flex: 1, padding: 12, background: couleurs.panneau, borderRadius: 8 }}>
							<div style={{ fontSize: 22, color: couleurs.texte }}>{stats.draws}</div>
							<div style={{ fontSize: 11, color: couleurs.texteDoux }}>égalités</div>
						</div>
					</div>

					<div>
						<div style={{ fontSize: 13, color: couleurs.or, marginBottom: 8 }}>Succès</div>
						{stats.matchupsWon.length === 0 ? (
							<div style={{ fontSize: 12, color: couleurs.texteDiscret }}>Aucun succès pour l'instant.</div>
						) : (
							stats.matchupsWon.map((m, i) => (
								<div key={i} style={{ fontSize: 12, color: couleurs.texteDoux, padding: "4px 0" }}>
									{m.myFaction} contre {m.opponentFaction} — {date(m.firstWinAt)}
								</div>
							))
						)}
					</div>
				</div>
			)}

			{!enCours && !erreur && onglet === "historique" && (
				parties.length === 0 ? (
					<div style={{ color: couleurs.texteDiscret, textAlign: "center", fontSize: 13 }}>Aucune partie jouée.</div>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, color: couleurs.texteDoux }}>
						<thead>
							<tr style={{ color: couleurs.texteDiscret }}>
								<th style={styleCase}>Date</th>
								<th style={styleCase}>Adversaire</th>
								<th style={styleCase}>Factions</th>
								<th style={styleCase}>Résultat</th>
							</tr>
						</thead>
						<tbody>
							{parties.map((p) => (
								<tr key={p.id}>
									<td style={styleCase}>{date(p.playedAt)}</td>
									<td style={styleCase}>{p.opponent ?? "IA"}</td>
									<td style={styleCase}>{p.myFaction} / {p.opponentFaction}</td>
									<td style={{ ...styleCase, color: p.outcome === "WIN" ? "#6a6" : p.outcome === "LOSS" ? couleurs.erreur : couleurs.texteDoux }}>
										{p.outcome === "WIN" ? "Victoire" : p.outcome === "LOSS" ? "Défaite" : "Égalité"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)
			)}

			{!enCours && !erreur && onglet === "classement" && (
				<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, color: couleurs.texteDoux }}>
					<thead>
						<tr style={{ color: couleurs.texteDiscret }}>
							<th style={styleCase}>#</th>
							<th style={styleCase}>Joueur</th>
							<th style={styleCase}>ELO</th>
						</tr>
					</thead>
					<tbody>
						{classement.map((l) => (
							<tr key={l.id}>
								<td style={styleCase}>{l.rank}</td>
								<td style={styleCase}>{l.username}</td>
								<td style={{ ...styleCase, color: couleurs.or }}>{l.elo}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default Stats;