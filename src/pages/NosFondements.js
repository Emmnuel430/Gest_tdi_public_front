import React, { useEffect, useState } from "react";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";

const NosFondements = () => {
  const API = process.env.REACT_APP_API_BASE_URL;
  const [fondements, setFondements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFondements = async () => {
      try {
        const res = await fetch(`${API}/liste_fondement`);
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setFondements(sortedData);
      } catch (err) {
        setError("Impossible de charger les fondements.");
      } finally {
        setLoading(false);
      }
    };

    fetchFondements();
  }, [API]);

  return (
    <LayoutPublic>
      <div className="mt-20 text-center py-12 h-[30vh]">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          Nos Fondements
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Voici les principes essentiels qui guident notre communauté.
        </p>
      </div>

      <section className="py-12 px-4 md:px-16 bg-white">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh" }} // Centrer Loader au milieu de l'écran
          >
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-10">
            {fondements.map((fondement) => (
              <div
                key={fondement.id}
                className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                  {fondement.titre}
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {fondement.texte}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </LayoutPublic>
  );
};

export default NosFondements;
