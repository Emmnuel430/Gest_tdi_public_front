import React, { useEffect, useState } from "react";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";

const Parachiot = () => {
  const API = process.env.REACT_APP_API_BASE_URL;
  const LINK = process.env.REACT_APP_API_URL;
  const [parachiot, setParachiot] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParachiot = async () => {
      try {
        const res = await fetch(`${API}/liste_paracha`);
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setParachiot(sortedData);
      } catch (err) {
        setError("Impossible de charger les parachiot.");
      } finally {
        setLoading(false);
      }
    };

    fetchParachiot();
  }, [API]);

  return (
    <LayoutPublic>
      {/* Titre de page */}
      <div className="mt-20 text-center py-12 h-[30vh]">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          Les Parachiot
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Plongez chaque semaine dans l’étude des textes sacrés à travers nos
          résumés et documents.
        </p>
      </div>

      {/* Liste */}
      <section className="py-12 px-4 md:px-16 bg-white">
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
            {parachiot.map((paracha) => (
              <div
                key={paracha.id}
                className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                  {paracha.titre}
                </h2>

                {/* Date de lecture */}
                <p className="text-sm text-gray-600 mb-4">
                  Lecture prévue :{" "}
                  <span className="font-medium text-blue-900 text-capitalize">
                    {new Date(paracha.date_lecture).toLocaleDateString(
                      "fr-FR",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </p>

                {/* Contenu */}
                <p className="text-gray-700 mb-4 whitespace-pre-line">
                  {paracha.contenu}
                </p>

                {/* Fichier PDF s'il existe */}
                {paracha.fichier && (
                  <>
                    {/\.(mp4|mov|avi)$/i.test(paracha.fichier) ? (
                      <>
                        <h6 className="text-center text-blue-950">
                          Regarder la vidéo
                        </h6>
                        <video
                          controls
                          src={LINK + paracha.fichier}
                          className="w-100 mx-auto max-h-80 rounded-lg mt-2"
                        >
                          Votre navigateur ne prend pas en charge la vidéo.
                        </video>
                      </>
                    ) : (
                      <a
                        href={paracha.fichier}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-semibold text-blue-700 underline hover:text-blue-900"
                      >
                        📄 Voir le fichier
                      </a>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </LayoutPublic>
  );
};

export default Parachiot;
