import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiedDePage } from "../components/PiedDePage";
import { utilisateurConnecte, deconnecter } from "../api/auth";
import { couleurs } from "../theme";

function Menu() {
	const [pseudo, setPseudo] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		utilisateurConnecte().then((u) => {
			if (u)
				setPseudo(u.username);
		});
	}, []);

	const styleLien = {
		display: "block",
		padding: "16px 24px",
		background: couleurs.champ,
		border: `2px solid ${couleurs.or}`,
		borderRadius: 8,
		color: couleurs.or,
		textDecoration: "none",
		fontSize: 16,
		textAlign: "center" as const
	};

	return (
		<div style={{
			maxWidth: 300,
			margin: "80px auto",
			display: "flex",
			flexDirection: "column",
			gap: 12
		}}>
			<h1 style={{ textAlign: "center", color: couleurs.or, margin: 0 }}>Gwent</h1>

			<div style={{ textAlign: "center", fontSize: 13, color: couleurs.texteDoux, marginBottom: 8 }}>
				Connecté en tant que <span style={{ color: couleurs.or }}>{pseudo}</span>
			</div>

			<Link to="/combat" style={styleLien}>Combat</Link>
			<Link to="/stats" style={styleLien}>Statistiques</Link>
			<Link to="/parametres" style={styleLien}>Paramètres</Link>

			<button
				onClick={() => deconnecter().then(() => navigate("/connexion"))}
				style={{
					background: "none",
					border: "none",
					color: couleurs.texteDiscret,
					fontSize: 12,
					cursor: "pointer",
					fontFamily: "inherit",
					marginTop: 8
				}}
			>
				Se déconnecter
			</button>

			<PiedDePage />
		</div>
	);
}

export default Menu;