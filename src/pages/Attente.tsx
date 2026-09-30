import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSocket } from "../api/socket";
import { couleurs, styleBouton } from "../theme";

function Attente() {
	const [secondes, setSecondes] = useState(0);
	const [adversaire, setAdversaire] = useState<string | null>(null);
	const [erreur, setErreur] = useState("");
	const [dansLaFile, setDansLaFile] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const faction = (location.state?.faction as string) ?? "Witcher";

	useEffect(() => {
		if (adversaire !== null || erreur !== "")
			return;
		const intervalle = setInterval(() => setSecondes((s) => s + 1), 1000);
		return () => clearInterval(intervalle);
	}, [adversaire, erreur]);

	useEffect(() => {
		const socket = getSocket();

		function surFile() {
			setDansLaFile(true);
		}
		function surTrouve(donnees: { gameId: string; opponent: string }) {
			setAdversaire(donnees.opponent);
			setTimeout(() => navigate("/jeu", { state: { gameId: donnees.gameId } }), 2000);
		}
		function surErreur(donnees: { message: string }) {
			setErreur(donnees.message);
			setDansLaFile(false);
		}
		function surErreurConnexion() {
			setErreur("Connexion au serveur impossible.");
			setDansLaFile(false);
		}

		socket.on("queue:joined", surFile);
		socket.on("match:found", surTrouve);
		socket.on("queue:error", surErreur);
		socket.on("connect_error", surErreurConnexion);
		socket.emit("queue:join", { faction });

		return () => {
			socket.off("queue:joined", surFile);
			socket.off("match:found", surTrouve);
			socket.off("queue:error", surErreur);
			socket.off("connect_error", surErreurConnexion);
			socket.emit("queue:leave");
		};
	}, [faction, navigate]);

	function annuler() {
		getSocket().emit("queue:leave");
		navigate("/combat");
	}

	function reessayer() {
		setErreur("");
		setSecondes(0);
		getSocket().emit("queue:join", { faction });
	}

	const minutes = Math.floor(secondes / 60);
	const reste = String(secondes % 60).padStart(2, "0");

	return (
		<div style={{ maxWidth: 360, margin: "120px auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 20 }}>
			<h1 style={{ color: couleurs.or, margin: 0 }}>
				{adversaire ? "Adversaire trouvé !" : erreur ? "Recherche impossible" : "Recherche d'un adversaire"}
			</h1>

			<div style={{ fontSize: 40, color: couleurs.texte, fontVariantNumeric: "tabular-nums" }}>
				{minutes}:{reste}
			</div>

			<div aria-live="polite" style={{ fontSize: 14, color: couleurs.texteDoux, minHeight: 20 }}>
				{adversaire && `Contre ${adversaire}, la partie commence…`}
				{erreur && <span style={{ color: couleurs.erreur }}>{erreur}</span>}
				{!adversaire && !erreur && !dansLaFile && (
					<span style={{ color: couleurs.texteDiscret, fontSize: 12 }}>Connexion…</span>
				)}
			</div>

			{adversaire === null && (
				<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
					{erreur && (
						<button onClick={reessayer} style={styleBouton(false)}>
							Réessayer
						</button>
					)}
					<button
						onClick={annuler}
						style={
							erreur
								? { background: "none", border: "none", color: couleurs.texteDiscret, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }
								: styleBouton(false)
						}
					>
						{erreur ? "Retour" : "Annuler"}
					</button>
				</div>
			)}
		</div>
	);
}

export default Attente;