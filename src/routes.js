// Importation des dépendances React et des composants nécessaires de React Router
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ------------------------------
// import Accueil from "./pages/Accueil";
// import NosFondements from "./pages/NosFondements";
// import Parachiots from "./pages/Parachiots";
// import Etude from "./pages/Etudes";
// import Produits from "./pages/Produits";
// import DetailFondement from "./pages/DetailFondement";

// import HomePage from "./pages/template/HomePage";
import DynamicPage from "./pages/template/DynamicPage";
import SubsectionDetail from "./pages/SubsectionDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* ------------------- */}
      {/* ------- PUBLIC ------ */}
      {/* ------------------- */}
      {/* Accueil */}
      <Routes>
        {/* <Route path="/" element={<Accueil />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/fondements" element={<NosFondements />} />
        <Route path="/parachiot" element={<Parachiots />} />
        <Route path="/etudes" element={<Etude />} />
        <Route path="/boutique" element={<Produits />} />
        <Route path="/fondement/:id" element={<DetailFondement />} /> */}

        {/* Si l'URL n'est pas définie, renvoyer l'utilisateur vers la page de connexion */}
        <Route
          path="/:slug"
          element={<DynamicPage key={window.location.pathname} />}
        />
        <Route path="/" element={<DynamicPage key="acceuil" />} />
        <Route path="/subsection/:id" element={<SubsectionDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

// Exportation du composant AppRoutes pour l'utiliser dans d'autres parties de l'application
export default AppRoutes;
