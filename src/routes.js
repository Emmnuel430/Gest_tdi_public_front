// Importation des dépendances React et des composants nécessaires de React Router
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from "./pages/template/HomePage";
import DynamicPage from "./pages/template/DynamicPage";
import SubsectionDetail from "./pages/SubsectionDetail";
import NotFound from "./pages/NotFound";
import PrayersRequests from "./pages/forms/PrayersRequests";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DynamicPage key="accueil" />} />
        <Route path="/subsection/:id" element={<SubsectionDetail />} />
        <Route
          path="/:slug"
          element={<DynamicPage key={window.location.pathname} />}
        />
        <Route path="/prayers-request" element={<PrayersRequests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// Exportation du composant AppRoutes pour l'utiliser dans d'autres parties de l'application
export default AppRoutes;
