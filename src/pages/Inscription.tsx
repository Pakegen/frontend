import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { inscrire } from "../api/auth";
import type { SyntheticEvent } from "react";
import { PiedDePage } from "../components/PiedDePage";
import { couleurs, styleChamp, styleLabel, styleBouton } from "../theme";

function Inscription() {
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [motDePasse, setMotDePasse] = useState("");
	const [motDePasse2, setMotDePasse2] = useState("");
	const [erreur, setErreur] = useState("");
	const [enCours, setEnCours] = useState(false);

	const navigate = useNavigate();

	function valider() {
		if (pseudo.length < 3)
			return "Le pseudo est trop court."
		if (pseudo.length > 20)
			return "Le pseudo est trop long."
		if (!/^[a-zA-Z0-9_-]+$/.test(pseudo))
			return "Le pseudo ne peut contenir que des lettres, chiffres, _ et -.";
		if (email.length > 254)
			return "Adresse email est trop longue.";
		if (!email.includes("@"))
			return "Adresse email invalide.";
		if (motDePasse.length < 8)
			return "Le mot de passe doit etre au moins de 8 caracteres.";
		if (motDePasse.length > 128)
			return "Le mot de passe est trop long.";
		if (motDePasse !== motDePasse2)
			return "Le mot de passe n'est pas identique."
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
		inscrire(email, pseudo, motDePasse)
			.then(() => navigate("/menu"))
			.catch((err) => setErreur(err instanceof Error ? err.message : "Erreur de connexion au serveur !"))
			.finally(() => setEnCours(false));
	}
	return (
		<div style={{ maxWidth: 320, margin: "80px auto" }}>
			<h1 style={{ color: couleurs.or, textAlign: "center" }}>Gwent</h1>

			<form onSubmit={soumettre} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<div>
					<label htmlFor="pseudo" style={styleLabel}>Pseudo</label>
					<input
						id="pseudo"
						type="text"
						autoComplete="username"
						maxLength={20}
						value={pseudo}
						onChange={(e) => setPseudo(e.target.value)}
						style={styleChamp}
					/>
				</div>

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
						autoComplete="new-password"
						maxLength={128}
						value={motDePasse}
						onChange={(e) => setMotDePasse(e.target.value)}
						style={styleChamp}
					/>
				</div>

				<div>
					<label htmlFor="mdp2" style={styleLabel}>Confirmation mot de passe</label>
					<input
						id="mdp2"
						type="password"
						autoComplete="new-password"
						maxLength={128}
						value={motDePasse2}
						onChange={(e) => setMotDePasse2(e.target.value)}
						style={styleChamp}
					/>
				</div>

				{erreur && <div style={{ color: couleurs.erreur, fontSize: 12 }}>{erreur}</div>}

				<button
					type="submit"
					disabled={enCours}
					style={styleBouton(enCours)}>
					{enCours ? "Inscription..." : "S'inscrire"}
				</button>
			</form>

			<div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: couleurs.texteDiscret }}>
				Deja un compte ? <Link to="/connexion" style={{ color: couleurs.or }}>Se connecter</Link>
			</div>
			<PiedDePage />
		</div>
	);
}

export default Inscription;
