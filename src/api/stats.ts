const API_URL = import.meta.env.VITE_API_URL ?? "/api";
export type MesStats = {
	elo: number;
	wins: number;
	losses: number;
	draws: number;
	matchupsWon: { myFaction: string; opponentFaction: string; firstWinAt: string }[];
};

export type Issue = "WIN" | "LOSS" | "DRAW";

export type PartieHistorique = {
	id: number;
	playedAt: string;
	myFaction: string;
	opponentFaction: string;
	outcome: Issue;
	opponent: string | null;
};

export type LigneClassement = {
	id: number;
	rank: number;
	username: string;
	elo: number;
}

export async function mesStats(): Promise<MesStats> {
	const reponse = await fetch(`${API_URL}/stats/me`, { credentials: "include" });
	if (!reponse.ok)
		throw new Error(reponse.status === 401 ? "Session expirée." : "Erreur du serveur.");
	return (await reponse.json()) as MesStats;
}

export async function historique(limite = 20): Promise<PartieHistorique[]> {
	const reponse = await fetch(`${API_URL}/stats/history?limit=${limite}`, { credentials: "include" });
	if (!reponse.ok)
		throw new Error(reponse.status === 401 ? "Session expirée." : "Erreur du serveur.");
	return (await reponse.json()) as PartieHistorique[];
}

export async function leaderboard(limite= 20): Promise<LigneClassement[]> {
	const reponse = await fetch(`${API_URL}/stats/leaderboard?limit=${limite}`, { credentials: "include" });
	if (!reponse.ok)
		throw new Error(reponse.status === 401 ? "Session expirée." : "Erreur du serveur.");
	return (await reponse.json()) as LigneClassement[];
}
