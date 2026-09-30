import { useNavigate } from "react-router-dom";

function Conditions() {
	const navigate = useNavigate();
	const styleTitre = { color: "#b8860b", fontSize: 17, marginTop: 24, marginBottom: 8 };
	const styleTexte = { fontSize: 13, lineHeight: 1.7, color: "#ccc" };

	return (
		<div style={{ maxWidth: 700, margin: "40px auto", padding: "0 20px" }}>
			<button
				onClick={() => navigate(-1)}
				style={{ background: "none", border: "none", color: "#b8860b", fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "inherit" }}
			>
				← Retour
			</button>
			<h1 style={{ color: "#b8860b", marginTop: 16 }}>Conditions d'utilisation</h1>

			<h2 style={styleTitre}>Objet du service</h2>
			<p style={styleTexte}>
				Ce site propose un jeu de cartes en ligne jouable à deux, contre un autre
				joueur ou contre une intelligence artificielle. Il s'agit d'un projet
				étudiant réalisé dans le cadre du cursus de l'école 42, sans aucune
				vocation commerciale. En créant un compte, vous acceptez les présentes
				conditions.
			</p>

			<h2 style={styleTitre}>Compte utilisateur</h2>
			<p style={styleTexte}>
				La création d'un compte nécessite une adresse email valide, un pseudonyme
				et un mot de passe. Vous êtes responsable de la confidentialité de votre
				mot de passe et des actions effectuées depuis votre compte. Un seul compte
				par personne est autorisé.
			</p>

			<h2 style={styleTitre}>Règles de conduite</h2>
			<p style={styleTexte}>
				Il est interdit de tricher ou d'exploiter une faille du jeu, de tenter
				d'accéder aux comptes d'autres joueurs ou de perturber le fonctionnement
				du service. Les pseudonymes et messages injurieux, haineux, discriminatoires
				ou harcelants sont proscrits.
			</p>

			<h2 style={styleTitre}>Suspension</h2>
			<p style={styleTexte}>
				En cas de non-respect de ces règles, l'équipe du projet se réserve le
				droit de suspendre ou de supprimer un compte, sans préavis.
			</p>

			<h2 style={styleTitre}>Disponibilité</h2>
			<p style={styleTexte}>
				Le service est fourni tel quel, dans un cadre pédagogique. Aucune garantie
				de disponibilité, de continuité ou de conservation des parties n'est
				assurée.
			</p>

			<h2 style={styleTitre}>Propriété intellectuelle</h2>
			<p style={styleTexte}>
				Gwent et l'univers de The Witcher sont des marques et créations de
				CD PROJEKT. Ce projet est une réalisation de fans à but exclusivement
				pédagogique ; il n'est ni affilié à CD PROJEKT, ni approuvé par cette
				société, et ne génère aucun revenu.
			</p>

			<h2 style={styleTitre}>Modification des conditions</h2>
			<p style={styleTexte}>
				Ces conditions peuvent évoluer. La version en vigueur est celle affichée
				sur cette page.
			</p>

			<h2 style={styleTitre}>Contact</h2>
			<p style={styleTexte}>
				[Même adresse que dans la politique de confidentialité]
			</p>
		</div>
	);
}

export default Conditions;