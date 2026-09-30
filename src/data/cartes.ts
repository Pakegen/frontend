import donnees from "./library.json";
import type { CarteLibrairie } from "../types-moteur";

const librairie = donnees as unknown as Record<string, CarteLibrairie>; //double conversion : le fichier contient aussi une cle "_comment" qui n'est pas une carte

export function carteParId(id: number): CarteLibrairie | undefined {
	return librairie[`Card_${id}`];
}

export function nomCarte(id: number): string {
	return carteParId(id)?.Name ?? `#${id}`;
}

export function forceBase(id: number): number {
	return carteParId(id)?.Strength ?? 0;
}