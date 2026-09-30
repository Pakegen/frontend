import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connecter } from "../api/auth";
import type { SyntheticEvent } from "react";
import { PiedDePage } from "../components/PiedDePage";
import { couleurs, styleChamp, styleLabel, styleBouton } from "../theme";

function Connexion() {
	const [email, setEmail] = useState("");
	const [motDePasse, setMotDePasse] = useState("");
	const [erreur, setErreur] = useState("");
	const [enCours, setEnCours] = useState(false);
	const navigate = useNavigate();

	function valider() {
		if (email.length > 254)
			return "Adresse email trop longue.";
		if (!email.includes("@"))
			return "Adresse email invalide.";
		if (motDePasse.length < 8)
			return "Le mot de passe doit faire au moins 8 caracteres.";
		if (motDePasse.length > 128)
			return "le mot de passe est trop long."

		return "";
	}

	function soumettre(e: SyntheticEvent) {
		e.preventDefault();
		const probleme = valider();
		if (probleme) {
			setErreur(probleme);
			return;
		}
		setErreur("");
		setEnCours(true);
		connecter(email, motDePasse)
			.then(() => navigate("/menu"))
			.catch((err) => setErreur(err instanceof Error ? err.message : "Erreur de connexion au serveur !"))
			.finally(() => setEnCours(false));
	}
	return (
		<div style={{ maxWidth: 320, margin: "80px auto" }}>
			<h1 style={{ color: couleurs.or, textAlign: "center" }}>Gwent</h1>

			<form onSubmit={soumettre} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<div>
					<label htmlFor="email" style={styleLabel}>Email</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						maxLength={254}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={styleChamp}
					/>
				</div>

				<div>
					<label htmlFor="mdp" style={styleLabel}>Mot de passe</label>
					<input
						id="mdp"
						type="password"
						autoComplete="current-password"
						maxLength={128}
						value={motDePasse}
						onChange={(e) => setMotDePasse(e.target.value)}
						style={styleChamp}
					/>
				</div>

				{erreur && <div style={{ color: couleurs.erreur, fontSize: 12 }}>{erreur}</div>}

				<button
					type="submit"
					disabled={enCours}
					style={styleBouton(enCours)}>
					{enCours ? "Connexion..." : "Se connecter"}
				</button>
			</form>

			<div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: couleurs.texteDiscret }}>
				Pas de compte ? <Link to="/inscription" style={{ color: couleurs.or }}>S'inscrire</Link>
			</div>
			<PiedDePage />
		</div>
	);
}

export default Connexion;
