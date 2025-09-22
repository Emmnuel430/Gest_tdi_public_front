import "./App.css";
import React from "react";
import GoogleAnalytics from "./GoogleAnalytics";
import AppRoutes from "./routes"; // Importation des routes de l'application

function App() {
  return (
    <div className="App">
      <GoogleAnalytics />
      <AppRoutes />{" "}
    </div>
  );
}

export default App;
