import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { utilisateurConnecte } from "../api/auth";
import { couleurs } from "../theme";

export function RoutePrivee({ children }: { children: ReactNode }) {
	const [autorise, setAutorise] = useState<boolean | null>(null);

	useEffect(() => {
		utilisateurConnecte().then((u) => setAutorise(u !== null));
	}, []);

	if (autorise === null)
		return (
			<div style={{ margin: "80px auto", textAlign: "center", color: couleurs.texteDoux }}>
				Chargement…
			</div>
		);

	if (!autorise)
		return <Navigate to="/connexion" replace />;

	return <>{children}</>;
}