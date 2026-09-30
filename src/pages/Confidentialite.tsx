import { useNavigate } from "react-router-dom";

function Confidentialite() {
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
			<h1 style={{ color: "#b8860b", marginTop: 16 }}>Politique de confidentialité</h1>

			<h2 style={styleTitre}>Qui sommes-nous</h2>
			<p style={styleTexte}>
				Ce site est un projet étudiant réalisé dans le cadre du cursus de l'école 42.
				Il n'a aucune vocation commerciale.
			</p>

			<h2 style={styleTitre}>Données collectées</h2>
			<p style={styleTexte}>
				Lors de la création d'un compte, nous enregistrons votre adresse email,
				votre pseudonyme et votre mot de passe. Le mot de passe n'est jamais
				stocké en clair : il est haché avec l'algorithme argon2, et nous ne
				pouvons donc pas le consulter. Nous conservons également la date de
				création et de dernière modification de votre compte.
			</p>

			<h2 style={styleTitre}>Finalité</h2>
			<p style={styleTexte}>
				L'email sert à identifier votre compte lors de la connexion. Le pseudonyme
				vous identifie auprès des autres joueurs. Aucune de ces données n'est
				utilisée à des fins publicitaires ou statistiques.
			</p>

			<h2 style={styleTitre}>Session</h2>
			<p style={styleTexte}>
				Lorsque vous vous connectez, un cookie technique contenant un jeton de
				session est déposé sur votre navigateur pour une durée de sept jours.
				Il est inaccessible au code JavaScript et transmis uniquement en HTTPS.
				Ce cookie est strictement nécessaire au fonctionnement du service et ne
				sert à aucun suivi publicitaire.
			</p>

			<h2 style={styleTitre}>Partage</h2>
			<p style={styleTexte}>
				Vos données ne sont transmises à aucun tiers. Elles sont stockées sur
				le serveur hébergeant l'application et ne quittent pas celui-ci.
			</p>

			<h2 style={styleTitre}>Conservation et suppression</h2>
			<p style={styleTexte}>
				Vos données sont conservées tant que votre compte existe. Vous pouvez
				demander la suppression de votre compte à tout moment ; l'ensemble des
				données associées est alors effacé.
			</p>

			<h2 style={styleTitre}>Vos droits</h2>
			<p style={styleTexte}>
				Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
				et de suppression de vos données personnelles. Pour l'exercer, contactez
				les responsables du projet.
			</p>

			<h2 style={styleTitre}>Contact</h2>
			<p style={styleTexte}>
				[Mettre une adresse de contact convenue avec l'équipe]
			</p>
		</div>
	);
}

export default Confidentialite;