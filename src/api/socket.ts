import { io, Socket } from "socket.io-client";
import type { VueJoueur } from "../types-moteur";

let socket: Socket | null = null;
let dernierEtat: VueJoueur | null = null;

export function getSocket(): Socket {
	if (socket === null) {
		socket = io({
			path: "/api/socket.io",
			withCredentials: true
		});
		socket.on("game:state", (etat: VueJoueur) => {
			dernierEtat = etat;
		});
	}
	return socket;
}

export function getDernierEtat(): VueJoueur | null {
	return dernierEtat;
}

export function oublierEtat() {
	dernierEtat = null;
}

export function fermerSocket() {
	if (socket !== null) {
		socket.disconnect();
		socket = null;
		dernierEtat = null;
	}
}