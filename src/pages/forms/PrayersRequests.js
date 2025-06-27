import React, { useState } from "react";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
// import Loader from "../../components/Layout/Loader";
import ToastMessage from "../../components/Layout/ToastMessage";

const PrayersRequests = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    objet: "",
    message: "",
    moyen_paiement: "",
    preuve_paiement: null,
  });
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setErrors({});
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/prayer-requests`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setSuccessMsg("Votre demande de prière a bien été envoyée !");
        setForm({
          nom: "",
          prenom: "",
          email: "",
          objet: "",
          message: "",
          moyen_paiement: "",
          preuve_paiement: null,
        });
      } else if (data.errors) {
        setErrors(data.errors);
        setErrorMsg("Veuillez corriger les erreurs du formulaire.");
      } else {
        setErrorMsg(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setErrorMsg("Erreur réseau ou serveur. Réessayez svp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPublic>
      <section className="bg-blue-100 h-[40vh] flex items-center justify-center">
        <div className="max-w-xl bg-white/80 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Demande de prière
          </h1>
          <p className="text-blue-800">
            Remplissez ce formulaire pour envoyer votre demande de prière.{" "}
            <br />
            Veuillez joindre la <strong>preuve de votre don</strong> pour que
            nous puissions traiter votre demande.
          </p>
        </div>
      </section>
      <section className="px-4 md:px-16 bg-white pb-20">
        <div className="mx-auto mt-10 bg-blue-50 p-8 rounded-2xl shadow">
          {errorMsg && (
            <ToastMessage message={errorMsg} onClose={() => setErrorMsg("")} />
          )}

          {success && (
            <ToastMessage
              message={successMsg}
              onClose={() => setSuccess(false)}
              success={true}
            />
          )}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-[#f9f9f9] py-10 px-6 md:px-10 rounded-xl shadow-md max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">
              Formulaire de demande de prière
            </h2>

            {/* NOM */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                placeholder="Ex: Cohen"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.nom}
                onChange={handleChange}
                required
              />
              {errors.nom && (
                <p className="text-red-500 text-sm mt-1">{errors.nom[0]}</p>
              )}
            </div>

            {/* PRENOM */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                placeholder="Ex: Eliyahou"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.prenom}
                onChange={handleChange}
                required
              />
              {errors.prenom && (
                <p className="text-red-500 text-sm mt-1">{errors.prenom[0]}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Ex: eliyahou@gmail.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            {/* OBJET */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">
                Objet *
              </label>
              <input
                type="text"
                name="objet"
                placeholder="Ex: Prière pour la guérison de mon père"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.objet}
                onChange={handleChange}
                required
              />
              {errors.objet && (
                <p className="text-red-500 text-sm mt-1">{errors.objet[0]}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                placeholder="Décrivez votre demande de prière en quelques lignes"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.message}
                onChange={handleChange}
                required
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message[0]}</p>
              )}
            </div>

            {/* MOYEN DE PAIEMENT */}
            <div className="mb-4">
              <p className="text-sm italic">
                Voir la page "Tsedaka" pour les numéros de transfert
              </p>
              <label className="block font-semibold text-gray-700 mb-1">
                Moyen de paiement *
              </label>
              <select
                name="moyen_paiement"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.moyen_paiement}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez</option>
                <option value="orange_money">Orange Money</option>
                <option value="mtn_money">MTN Money</option>
                <option value="wave">Wave</option>
                <option value="carte_bancaire">Carte bancaire</option>
                <option value="autre">Autre</option>
              </select>
              {errors.moyen_paiement && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.moyen_paiement[0]}
                </p>
              )}
            </div>

            {/* PREUVE */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">
                Preuve de paiement *
              </label>
              <input
                type="file"
                name="preuve_paiement"
                accept=".jpg,.jpeg,.png,.pdf"
                className="w-full px-3 py-2 border rounded-lg bg-white"
                onChange={handleChange}
                required
              />
              <p className="text-sm italic">
                Autorisés : (jpg, png, jpeg, pdf)
              </p>
              {errors.preuve_paiement && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preuve_paiement[0]}
                </p>
              )}
            </div>

            {/* BOUTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  loading ||
                  !form.nom ||
                  !form.prenom ||
                  !form.email ||
                  !form.objet ||
                  !form.message ||
                  !form.moyen_paiement ||
                  !form.preuve_paiement
                }
              >
                {loading ? (
                  <span>
                    <i className="fas fa-spinner fa-spin"></i> Chargement...
                  </span>
                ) : (
                  <span>Envoyer la demande</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </LayoutPublic>
  );
};

export default PrayersRequests;
