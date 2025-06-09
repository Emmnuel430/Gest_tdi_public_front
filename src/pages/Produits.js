import React, { useEffect, useState } from "react";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";
// import { FaShoppingCart } from "react-icons/fa";

const Produits = () => {
  const API = process.env.REACT_APP_API_BASE_URL;
  const LINK = process.env.REACT_APP_API_URL;
  const [produits, setProduits] = useState([]);
  const [selectedProduits, setSelectedProduits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nomClient, setNomClient] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch(`${API}/liste_produits`);
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setProduits(sortedData);
      } catch (err) {
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, [API]);

  const toggleSelection = (produit) => {
    setSelectedProduits((prev) =>
      prev.find((p) => p.id === produit.id)
        ? prev.filter((p) => p.id !== produit.id)
        : [...prev, produit]
    );
  };

  const handleOpenPanier = () => {
    if (selectedProduits.length > 0) setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber =
      process.env.REACT_APP_WHATSAPP_NUMBER || "2250759414534"; // à adapter

    const produitsText = selectedProduits
      .map((p) => `🛒 ${p.nom} - ${p.prix} FCFA`)
      .join("%0A");

    const message = `🛍️ *Demande d'information sur produit(s)*%0A%0A👤 *Nom du client :* ${nomClient}%0A%0A📦 *Produit(s) sélectionné(s) :*%0A${produitsText}%0A%0A📅 Bonjour, je suis intéressé(e) par le(s) produit(s) ci-dessus. Pourriez-vous me confirmer leur disponibilité ? Merci par avance.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    setShowModal(false);
    setNomClient("");
    setSelectedProduits([]);
  };

  return (
    <LayoutPublic>
      {/* En-tête */}
      <div className="mt-20 py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          Nos Produits
        </h1>
        <p className="text-gray-600 mt-2">
          Cliquez pour sélectionner les produits <br />
          Puis valider votre commande en cliquant sur le panier ci-dessous
        </p>

        {/* Icône panier */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleOpenPanier}
            className="relative text-blue-800 hover:text-blue-600"
          >
            <i className="fas fa-shopping-cart text-4xl"></i>
            {selectedProduits.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedProduits.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Contenu */}
      <section className="px-4 md:px-16 py-10 bg-white">
        {loading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produits.map((produit) => {
              const isSelected = selectedProduits.some(
                (p) => p.id === produit.id
              );
              return (
                <div
                  key={produit.id}
                  onClick={() => toggleSelection(produit)}
                  className={`cursor-pointer bg-blue-50 p-4 rounded-xl shadow transition hover:shadow-md border-2 ${
                    isSelected ? "border-blue-600" : "border-transparent"
                  }`}
                >
                  {produit.image && (
                    <img
                      src={`${LINK}${produit.image}`}
                      alt={produit.nom}
                      className="w-full max-h-62 object-contain mb-4 bg-white rounded-lg"
                    />
                  )}
                  <h2 className="text-xl font-bold text-blue-900">
                    {produit.nom}
                  </h2>
                  <p className="text-gray-700 text-sm mt-1">
                    {produit.description || "Pas de description."}
                  </p>
                  <p className="text-blue-800 font-semibold mt-2">
                    {Number(produit.prix).toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modale panier */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-800">
              🛒 Votre sélection
            </h3>

            <ul className="mb-4 list-disc pl-6 text-gray-700">
              {selectedProduits.map((p) => (
                <li key={p.id}>
                  {p.nom} - {p.prix} FCFA
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Votre nom
              </label>
              <input
                type="text"
                required
                value={nomClient}
                onChange={(e) => setNomClient(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
                placeholder="Entrez votre nom"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Envoyer via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </LayoutPublic>
  );
};

export default Produits;
