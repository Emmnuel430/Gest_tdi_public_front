import React, { useState } from "react";
import ToastMessage from "../../components/Layout/ToastMessage";
import MoyensPaiementSlider from "../MoyensPaiementSlider";

export default function AdhesionForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    moyen_paiement: "",
    preuve_paiement: null,
    statut: "",
    abonnement_type: "",
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
        `${process.env.REACT_APP_API_BASE_URL}/adherents`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setSuccessMsg("Votre demande d'adhésion a bien été envoyée !");
        setForm({
          nom: "",
          prenom: "",
          email: "",
          contact: "",
          moyen_paiement: "",
          preuve_paiement: null,
          statut: "",
        });
      } else if (data.errors) {
        setErrors(data.errors);
        setErrorMsg("Veuillez corriger les erreurs du formulaire.");
      } else {
        setErrorMsg(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setErrorMsg("Erreur réseau ou serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-blue-50 p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-4">
        Formulaire de demande d’adhésion
      </h2>
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
        className="bg-[#f9f9f9] py-10 px-6 md:px-10 rounded-xl shadow-md mx-auto"
      >
        <p className="text-sm text-center text-gray-600 mb-6">
          Merci de remplir ce formulaire pour rejoindre notre communauté de
          formation. <br /> Veuillez joindre la preuve de votre dépôt pour
          l'inscription.
        </p>

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

        {/* CONTACT */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="number"
            name="contact"
            placeholder="Ex: +225 07 07 07 07"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.contact}
            onChange={handleChange}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact[0]}</p>
          )}
        </div>

        {/* MOYEN DE PAIEMENT */}
        <div className="mb-4">
          <hr className="my-2 bg-gray-400 h-[3px]" />
          <div>
            <MoyensPaiementSlider />
          </div>
          <hr className="my-2 bg-gray-400 h-[3px]" />
          <label className="block font-semibold text-gray-700 mb-1">
            Moyen de paiement utilisé *
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
          <p className="text-sm italic">Autorisés : (jpg, png, jpeg, pdf)</p>
          {errors.preuve_paiement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.preuve_paiement[0]}
            </p>
          )}
        </div>

        {/* STATUT */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Je suis un(e) *
          </label>
          <select
            name="statut"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.statut}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez</option>
            <option value="standard">Membre externe</option>
            <option value="premium">Membre de la communauté</option>
          </select>
          {errors.statut && (
            <p className="text-red-500 text-sm mt-1">{errors.statut[0]}</p>
          )}
        </div>

        {/* TYPE D'ABONNEMENT */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Type d'abonnement *
          </label>
          <select
            name="abonnement_type"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.abonnement_type}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez</option>
            <option value="hebdomadaire">Hebdomadaire</option>
            <option value="mensuel">Mensuel</option>
            <option value="annuel">Annuel</option>
          </select>
          {errors.abonnement_type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.abonnement_type[0]}
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
              !form.moyen_paiement ||
              !form.preuve_paiement ||
              !form.statut ||
              !form.abonnement_type
            }
          >
            {loading ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Chargement...
              </span>
            ) : (
              "Envoyer la demande d’adhésion"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
