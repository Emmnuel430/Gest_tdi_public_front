import React, { useEffect, useState } from "react";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import home from "../assets/img/home.jpg";
import Loader from "../components/Layout/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Accueil = () => {
  const [actus, setActus] = useState([]);
  const [loadingActus, setLoadingActus] = useState(false);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [, setErrorEvents] = useState("");
  const [, setErrorActus] = useState("");
  const [conseillers, setConseillers] = useState([]);
  const [loadingConseillers, setLoadingConseillers] = useState(false);
  const [, setErrorConseillers] = useState("");
  const [mot, setMots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [synagogues, setSynagogues] = useState([]);
  const [loadingS, setLoadingS] = useState(false);
  const [, setError] = useState("");

  const API = process.env.REACT_APP_API_BASE_URL;
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMots = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API}/liste_mot`);
        const data = await res.json();
        const lastMot = data[data.length - 1]; // Dernier élément du tableau
        setMots(lastMot);
      } catch (error) {
        setError("Impossible de charger les données : " + error.message);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    const fetchSynagogue = async () => {
      setLoadingS(true);
      setError("");
      try {
        const res = await fetch(`${API}/liste_synagogue`);
        const data = await res.json();
        setSynagogues(data);
      } catch (error) {
        setError("Impossible de charger les données : " + error.message);
      } finally {
        setLoadingS(false); // Fin du chargement
      }
    };
    const fetchActus = async () => {
      setLoadingActus(true);
      setErrorActus("");
      try {
        const res = await fetch(`${API}/liste_actualite`);
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setActus(sortedData);
      } catch (error) {
        setErrorActus("Impossible de charger les actus : " + error.message);
      } finally {
        setLoadingActus(false);
      }
    };
    const fetchEvents = async () => {
      setLoadingEvents(true);
      setErrorEvents("");
      try {
        const res = await fetch(`${API}/liste_evenement`);
        const data = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setEvents(sortedData);
      } catch (error) {
        setErrorEvents(
          "Impossible de charger les événements : " + error.message
        );
      } finally {
        setLoadingEvents(false);
      }
    };
    const fetchConseillers = async () => {
      setLoadingConseillers(true);
      setErrorConseillers("");
      try {
        const res = await fetch(`${API}/liste_conseiller`);
        const data = await res.json();
        setConseillers(data);
      } catch (error) {
        setErrorConseillers(
          "Impossible de charger les conseillers : " + error.message
        );
      } finally {
        setLoadingConseillers(false);
      }
    };

    fetchMots();
    fetchSynagogue();
    fetchActus();
    fetchEvents();
    fetchConseillers();
  }, [API]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatted = date.toLocaleDateString("fr-FR", options);

    // Séparer les parties et capitaliser le mois
    const [jour, mois, annee] = formatted.split(" ");
    const moisMaj = mois.charAt(0).toUpperCase() + mois.slice(1);

    return `${jour} ${moisMaj} ${annee}`;
  };
  const formatDateParts = (dateString) => {
    const d = new Date(dateString);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleDateString("fr-FR", { month: "short" }),
      year: d.getFullYear(),
    };
  };

  return (
    <>
      <LayoutPublic>
        <div className="w-full">
          {/* Hero Section */}
          <section
            className="h-screen bg-cover bg-center flex items-center flex flex-col justify-center"
            style={{
              backgroundImage: `url(${home})`, // Assure-toi que le chemin est correct
            }}
          >
            <div className="max-w-xl bg-white/80 p-8 rounded-lg shadow-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                Bienvenue sur notre site
              </h2>
              <p className="text-lg text-blue-800">
                Découvrez nos enseignements, événements, et bien plus encore.
              </p>
            </div>
          </section>

          <div className="py-5 bg-blue-100 w-full">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Nos synagogues
            </h2>
            {loadingS ? (
              <div
                className="flex flex-col justify-center items-center w-full"
                style={{ height: "40vh" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Infos Synagogue */}
                {synagogues.map((synagogue) => (
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">
                      {synagogue.nom}
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      <span className="font-semibold text-blue-800">
                        Adresse :
                      </span>{" "}
                      {synagogue.localisation}
                    </p>
                    <p className="text-gray-700 whitespace-pre-line mt-2">
                      <span className="font-semibold text-blue-800">
                        Horaires :
                      </span>{" "}
                      {synagogue.horaires}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="py-5 bg-blue-50 w-full">
            {loading ? (
              <div
                className="flex flex-col justify-center items-center w-full"
                style={{ height: "40vh" }}
              >
                <Loader />
              </div>
            ) : (
              <div className=" mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Partie Mot du Rabbi */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4">
                    Le mot du Rabbi
                  </h2>
                  {mot && (
                    <>
                      <p className="text-blue-800 text-lg">"{mot.texte}"</p>
                      <span className="text-end italic text-blue-950">
                        - {mot.nom_rabbi}
                      </span>
                    </>
                  )}
                </div>

                {/* Partie Communauté */}
                <div className="flex flex-col justify-center items-start md:items-end text-right">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">
                    Communauté
                  </h2>
                  <div className="w-16 h-1 bg-blue-800 mb-4"></div>
                  <p className="text-blue-800 text-2xl font-semibold">
                    537 membres
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="py-8 bg-gray-50">
            {loadingActus ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh" }} // Centrer Loader au milieu de l'écran
              >
                <Loader />
              </div>
            ) : (
              <div className="px-4">
                {/* Titre */}
                <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
                  Actualités
                </h2>

                {/* Liste des actus */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Carte actu */}
                  {actus.slice(0, 3).map((actu, item) => (
                    <div
                      key={item}
                      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          {actu.titre}
                        </h3>
                        <p className="text-blue-800 text-sm mb-4">
                          {actu.description.split(" ").length > 10
                            ? actu.description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ") + "..."
                            : actu.description}
                        </p>
                        <span className="text-sm text-gray-500 text-end block">
                          Date : {formatDate(actu.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bouton */}
                <div className="mt-10 text-center">
                  <button className="bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                    Voir toutes les actualités
                  </button>
                </div>
              </div>
            )}
          </div>

          <section className="h-full py-6 bg-white">
            {loadingEvents ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh" }} // Centrer Loader au milieu de l'écran
              >
                <Loader />
              </div>
            ) : (
              <div className="px-4">
                {/* Titre */}
                <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
                  Événements à venir
                </h2>

                {/* Grille des événements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {events
                    .slice(0, 4)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event) => {
                      const { day, month, year } = formatDateParts(event.date);
                      return (
                        <div
                          key={event.id}
                          className="flex flex-col md:flex-row items-center gap-6 bg-yellow-50 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                          {/* Bloc Date */}
                          <div className="bg-blue-800 text-white text-center px-6 py-4 rounded flex md:flex-col gap-2 md:gap-0 items-center">
                            <p className="text-2xl font-bold">{day}</p>
                            <p className="uppercase text-sm">{month}</p>
                            <p className="uppercase text-sm">{year}</p>
                          </div>

                          {/* Détails */}
                          <div className="flex-1 px-4 py-2">
                            <h3 className="text-xl font-semibold text-blue-900">
                              {event.titre}
                            </h3>
                            <p className="text-blue-800 text-sm mt-2 line-clamp-3">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Bouton */}
                <div className="mt-12 text-center">
                  <button className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                    Voir tous les événements
                  </button>
                </div>
              </div>
            )}
          </section>

          <div className="h-full py-4 bg-blue-50">
            {loadingConseillers ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh" }} // Centrer Loader au milieu de l'écran
              >
                <Loader />
              </div>
            ) : (
              <div className="w-full px-4">
                <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
                  Conseil Communautaire
                </h2>

                <Swiper
                  modules={[Autoplay]}
                  speed={400}
                  loop={true}
                  spaceBetween={30}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  grabCursor={true}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="swiper review__swiper min-h-[55vh]"
                >
                  {conseillers.map((conseiller) => (
                    <SwiperSlide key={conseiller.id}>
                      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
                        <img
                          src={LINK + conseiller.photo}
                          alt={`${conseiller.nom} ${conseiller.prenom}`}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-blue-900">
                          {conseiller.nom} {conseiller.prenom}
                        </h3>
                        <p className="text-sm text-blue-700">
                          {conseiller.role}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </LayoutPublic>
    </>
  );
};

export default Accueil;
