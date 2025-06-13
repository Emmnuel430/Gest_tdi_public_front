import React, { useState } from "react";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
import Loader from "../../components/Layout/Loader";
import { Link } from "react-router-dom";
import truncate from "html-truncate";

const ShopPage = ({ page }) => {
  const produits =
    page?.sections?.flatMap((section) => section.subsections || []) || [];
  const LINK = process.env.REACT_APP_API_BASE_URL_STORAGE + "/";
  const [selectedProduits, setSelectedProduits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nomClient, setNomClient] = useState("");

  const toggleSelection = (produit) => {
    const alreadySelected = selectedProduits.find((p) => p.id === produit.id);
    if (alreadySelected) {
      setSelectedProduits((prev) => prev.filter((p) => p.id !== produit.id));
    } else {
      setSelectedProduits((prev) => [...prev, produit]);
    }
  };

  const handleOpenPanier = () => {
    if (selectedProduits.length > 0) {
      setShowModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomClient.trim()) return;
    const whatsappNumber =
      process.env.REACT_APP_WHATSAPP_NUMBER || "2250759414534";

    const message = `Bonjour, je suis *${nomClient}*. Voici ma commande :%0A%0A${selectedProduits
      .map((p) => `- ${p.title} (${Number(p.prix).toLocaleString()} FCFA)`)
      .join("%0A")}%0A%0AMerci.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const loading = !page;
  const error = page && produits.length === 0;

  return (
    <LayoutPublic>
      {/* En-tête */}
      <div className="mt-20 py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          {page.title || ""}
        </h1>
        <p className="text-gray-600 mt-2">
          {page.subtitle || ""} <br />
          Cliquez pour sélectionner les produits <br />
          Puis validez votre commande en cliquant sur le panier ci-dessous
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
          <p className="text-center text-red-500">
            Aucun produit disponible pour le moment.
          </p>
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
                      alt={produit.title}
                      className="w-full max-h-62 object-contain mb-4 bg-white rounded-lg"
                    />
                  )}
                  <h2 className="text-xl font-bold text-blue-900">
                    {produit.title}
                  </h2>
                  <p className="text-blue-800 font-semibold mt-2">
                    {Number(produit.prix || 0).toLocaleString("fr-FR")} FCFA
                  </p>

                  {/* Contenu HTML */}
                  {produit.content && (
                    <div className="text-sm text-blue-800 flex-grow flex flex-col justify-between">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncate(produit.content, 150),
                        }}
                      />
                      {produit.content &&
                        produit.content.replace(/<[^>]*>?/gm, "").length >
                          150 && (
                          <Link
                            to={`/subsection/${produit.id}`}
                            className="text-blue-600 hover:underline border p-2 inline-block mt-2 w-max"
                          >
                            Lire plus →
                          </Link>
                        )}
                    </div>
                  )}
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
                  {p.title} - {Number(p.prix || 0).toLocaleString("fr-FR")} FCFA
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

export default ShopPage;
