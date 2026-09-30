import {Sword, Shield, Sparkles} from "lucide-react";
import type { ElementType } from "react";
import { couleurs } from "../theme";

export function Carte({nom, force, categorie, selectionnee, onClick}: {
	nom: string; 
	force: number; 
	categorie: string;
	selectionnee?: boolean;
	onClick?: () => void;
}) {
	const icones: Record<string, ElementType> = {
		hero: Sword,
		troupe: Shield,
		magie: Sparkles
	};
	const Icone = icones[categorie];

	return (
		<div onClick={(e) => { e.stopPropagation(); onClick?.(); }} style={{
			position: "relative",
			width: 70,
			height: 100,
			background: couleurs.carte,
			border: selectionnee ? "2px solid #fff" : "2px solid #b8860b",
			borderRadius: 8,
			padding: 8,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			cursor: onClick ? "pointer" : "default",
			transform: selectionnee ? "translateY(-10px)" : "none"
			
		}}>
			<div style={{ position: "absolute", top: 6, right: 6, color: couleurs.or}}> {Icone && <Icone size={16} />}
			</div>
			<div style={{ fontSize: 20, fontWeight: "bold" }}>{force}</div>
			<div style={{ fontSize: 11 }}>{nom}</div>
		</div>
	);
}
