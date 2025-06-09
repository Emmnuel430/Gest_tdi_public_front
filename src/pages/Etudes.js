import React, { useEffect, useState } from "react";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";

const Etudes = () => {
  const API = process.env.REACT_APP_API_BASE_URL;
  const [etudes, setEtudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEtudes = async () => {
      try {
        const res = await fetch(`${API}/liste_etude`);
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setEtudes(sortedData);
      } catch (err) {
        setError("Impossible de charger les études.");
      } finally {
        setLoading(false);
      }
    };

    fetchEtudes();
  }, [API]);

  return (
    <LayoutPublic>
      {/* En-tête de page */}
      <div className="mt-20 text-center py-12 h-[30vh]">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          Études de la Torah
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Découvrez nos réflexions et analyses spirituelles enrichissantes.
        </p>
      </div>

      {/* Contenu */}
      <section className="px-4 md:px-16 bg-white">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh" }}
          >
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-10">
            {etudes.map((etude) => (
              <div
                key={etude.id}
                className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                  {etude.titre}
                </h2>

                {/* Affichage du verset s'il existe */}
                {etude.verset && (
                  <p className="italic text-blue-700 mb-4">📖 {etude.verset}</p>
                )}

                {/* Contenu de l'étude */}
                <p className="text-gray-700 whitespace-pre-line">
                  {etude.texte}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </LayoutPublic>
  );
};

export default Etudes;
