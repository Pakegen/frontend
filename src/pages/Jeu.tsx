import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSocket, getDernierEtat } from "../api/socket";
import type { VueJoueur } from "../types-moteur";
import { nomCarte, forceBase, carteParId } from "../data/cartes";
import { couleurs } from "../theme";

function Jeu() {
	const [etat, setEtat] = useState<VueJoueur | null>(getDernierEtat());
	const [erreur, setErreur] = useState("");
	const [selection, setSelection] = useState<number | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const room = (location.state?.gameId as string) ?? "";

	useEffect(() => {
		const socket = getSocket();

		function surEtat(nouvel: VueJoueur) {
			console.log("ETAT RECU", nouvel);
			setEtat(nouvel);
			setErreur("");
			setSelection(null);
		}
		function surErreur(donnees: { message: string }) {
			setErreur(donnees.message);
		}

		socket.on("game:state", surEtat);
		socket.on("game:error", surErreur);

		return () => {
			socket.off("game:state", surEtat);
			socket.off("game:error", surErreur);
		};
	}, []);

	if (etat === null)
		return (
			<div style={{ margin: "120px auto", textAlign: "center", color: couleurs.texteDoux }}>
				En attente de la partie…
			</div>
		);

	const moi = etat.Client_Player_Number;
	const lui = moi === 1 ? 2 : 1;

	function champ<T>(joueur: number, suffixe: string): T {
		return (etat as unknown as Record<string, T>)[`Player_${joueur}_${suffixe}`];
	}

	const monTour = etat.Active_Player === moi;
	const brut = etat.Available_Commands?.[String(moi)];
	const mesCommandes: string[] = Array.isArray(brut) ? brut : [];

	const maMain: number[] = champ<number[]>(moi, "Hand") ?? [];
	const maMelee: number[] = champ<number[]>(moi, "Front_Row") ?? [];
	const maDistance: number[] = champ<number[]>(moi, "Back_Row") ?? [];
	const monCimetiere: number[] = champ<number[]>(moi, "Graveyard") ?? [];

	const saMelee: number[] = champ<number[]>(lui, "Front_Row") ?? [];
	const saDistance: number[] = champ<number[]>(lui, "Back_Row") ?? [];
	const sonCimetiere: number[] = champ<number[]>(lui, "Graveyard") ?? [];

	const monTotal = champ<number>(moi, "Board_Strength") ?? 0;
	const sonTotal = champ<number>(lui, "Board_Strength") ?? 0;
	const mesCouronnes = champ<number>(moi, "Crown") ?? 0;
	const sesCouronnes = champ<number>(lui, "Crown") ?? 0;
	const jaiPasse = champ<boolean>(moi, "has_passed") ?? false;
	const ilAPasse = champ<boolean>(lui, "has_passed") ?? false;

	function envoyer(code: string) {
		getSocket().emit("game:action", { room, code });
	}

	function Vignette({ id, actif, onClick }: { id: number; actif?: boolean; onClick?: () => void }) {
		const carte = carteParId(id);
		return (
			<div
				onClick={onClick}
				style={{
					width: 70,
					height: 100,
					flexShrink: 0,
					background: couleurs.carte,
					border: `2px solid ${actif ? "#fff" : couleurs.or}`,
					borderRadius: 8,
					padding: 6,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					cursor: onClick ? "pointer" : "default",
					transform: actif ? "translateY(-10px)" : "none"
				}}
			>
				<div style={{ fontSize: 20, fontWeight: "bold" }}>{forceBase(id)}</div>
				<div style={{ fontSize: 10 }}>{nomCarte(id)}</div>
				<div style={{ fontSize: 8, color: couleurs.texteDiscret }}>{carte?.Type}</div>
			</div>
		);
	}

	const styleRangee = {
		display: "flex",
		gap: 6,
		minHeight: 110,
		padding: 8,
		background: couleurs.champ,
		border: `1px solid ${couleurs.bordure}`,
		borderRadius: 6,
		overflowX: "auto" as const
	};

	return (
		<div style={{ maxWidth: 900, margin: "20px auto", display: "flex", flexDirection: "column", gap: 6 }}>

			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: couleurs.texteDoux }}>
				<span>Manche {etat.Round_number} — tour {etat.Turn_number}</span>
				<span>{etat.Game_Phase}</span>
				<span>{monTour ? "À vous de jouer" : "Tour de l'adversaire"}</span>
			</div>

			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: couleurs.texteDoux }}>
				<span>Adversaire — {sesCouronnes} couronne(s) {ilAPasse && "— a passé"}</span>
				<span>Cimetière : {sonCimetiere.length}</span>
				<span style={{ color: couleurs.or, fontSize: 18 }}>{sonTotal}</span>
			</div>

			<div style={styleRangee}>{saDistance.map((id, i) => <Vignette key={`sd${i}`} id={id} />)}</div>
			<div style={styleRangee}>{saMelee.map((id, i) => <Vignette key={`sm${i}`} id={id} />)}</div>

			<div style={{ height: 2, background: couleurs.or, margin: "6px 0" }} />

			<div style={styleRangee}>{maMelee.map((id, i) => <Vignette key={`mm${i}`} id={id} />)}</div>
			<div style={styleRangee}>{maDistance.map((id, i) => <Vignette key={`md${i}`} id={id} />)}</div>

			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: couleurs.texteDoux }}>
				<span>Vous — {mesCouronnes} couronne(s) {jaiPasse && "— a passé"}</span>
				<span>Cimetière : {monCimetiere.length}</span>
				<span style={{ color: couleurs.or, fontSize: 18 }}>{monTotal}</span>
			</div>

			<div style={{ ...styleRangee, paddingTop: 20, background: couleurs.panneau }}>
				{maMain.map((id, i) => (
					<Vignette
						key={`main${i}`}
						id={id}
						actif={selection === i}
						onClick={() => setSelection(selection === i ? null : i)}
					/>
				))}
			</div>

			{erreur && <div style={{ color: couleurs.erreur, fontSize: 12 }}>{erreur}</div>}

			<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
				{mesCommandes.length === 0 ? (
					<span style={{ fontSize: 11, color: couleurs.texteDiscret }}>Aucune commande disponible</span>
				) : (
					mesCommandes.map((code) => (
						<button
							key={code}
							onClick={() => envoyer(code)}
							style={{
								padding: "6px 10px",
								background: couleurs.champ,
								border: `1px solid ${couleurs.bordure}`,
								borderRadius: 4,
								color: couleurs.texteDoux,
								fontSize: 11,
								fontFamily: "monospace",
								cursor: "pointer"
							}}
						>
							{code}
						</button>
					))
				)}
			</div>

			<button
				onClick={() => navigate("/menu")}
				style={{ alignSelf: "flex-start", background: "none", border: "none", color: couleurs.texteDiscret, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
			>
				Quitter
			</button>
		</div>
	);
}

export default Jeu;