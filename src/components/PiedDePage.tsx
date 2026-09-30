import { Link } from "react-router-dom";
import { couleurs } from "../theme";

export function PiedDePage() {
	const styleLien = { color: couleurs.texteDiscret, textDecoration: "none", fontSize: 11 };

	return (
		<footer style={{
			marginTop: 40,
			paddingTop: 16,
			borderTop: "1px solid #333",
			display: "flex",
			justifyContent: "center",
			gap: 16,
			flexWrap: "wrap" as const
		}}>
			<Link to="/confidentialite" style={styleLien}>Politique de confidentialite</Link>
			<Link to="/conditions" style={styleLien}>Conditions d'utilisation</Link>
		</footer>
	)
}