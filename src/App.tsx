import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jeu from "./pages/Jeu";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Menu from "./pages/Menu";
import Confidentialite from "./pages/Confidentialite";
import Conditions from "./pages/Conditions";
import Combat from "./pages/Combat";
import Attente from "./pages/Attente";
import { RoutePrivee } from "./components/RoutePrivee";
import Stats from "./pages/Stats";
import FinPartie from "./pages/FinPartie";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Connexion />} />
				<Route path="/connexion" element={<Connexion />} />
				<Route path="/inscription" element={<Inscription />} />
				<Route path="/menu" element={<RoutePrivee><Menu /></RoutePrivee>} />
				<Route path="/jeu" element={<RoutePrivee><Jeu /></RoutePrivee>} />
				<Route path="/combat" element={<RoutePrivee><Combat /></RoutePrivee>} />
				<Route path="/fin" element={<RoutePrivee><FinPartie /></RoutePrivee>} />
				<Route path="/stats" element={<RoutePrivee><Stats /></RoutePrivee>} />
				<Route path="/attente" element={<RoutePrivee><Attente /></RoutePrivee>} />
				<Route path="/confidentialite" element={<Confidentialite />} />
				<Route path="/conditions" element={<Conditions />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;