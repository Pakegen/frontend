// Client pour les endpoints /auth du backend.
// Passe par nginx (https://localhost/api/...), pas directement par le port 3000 du
// backend: le sujet impose HTTPS pour toute connexion navigateur -> backend.
const API_URL = import.meta.env.VITE_API_URL ?? "/api";
export type UtilisateurPublic = {
	id: number;
	email: string;
	username: string;
};

type CorpsErreurApi = {
	message: string | string[];
	error?: string;
	statusCode: number;
};

function messageErreur(corps: CorpsErreurApi): string {
	// Le ValidationPipe du backend renvoie un tableau de messages (un par
	// champ invalide), les autres erreurs (409, 401) renvoient une string
	return Array.isArray(corps.message) ? corps.message[0] : corps.message;
}

async function appelAuth(chemin: "signup" | "login", donnees: unknown): Promise<UtilisateurPublic> {
	const reponse = await fetch(`${API_URL}/auth/${chemin}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		// necessaire pour que le navigateur envoie/accepte le cookie de
		// session httpOnly renvoye par le backend (voir auth.controller.ts)
		credentials: "include",
		body: JSON.stringify(donnees),
	});

	const corps = await reponse.json();
	if (!reponse.ok) throw new Error(messageErreur(corps as CorpsErreurApi));
	return corps as UtilisateurPublic;
}

export function inscrire(email: string, username: string, password: string) {
	return appelAuth("signup", { email, username, password });
}

export function connecter(email: string, password: string) {
	return appelAuth("login", { email, password });
}

// Renvoie l'utilisateur connecte, ou null si la session est absente ou expiree.
export async function utilisateurConnecte(): Promise<UtilisateurPublic | null> {
	const reponse = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
	if (!reponse.ok)
		return null;
	return (await reponse.json()) as UtilisateurPublic;
}

export async function deconnecter(): Promise<void> {
	await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}