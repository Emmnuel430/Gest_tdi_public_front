import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png"; // Mets ici ton chemin correct vers le logo
import floral from "../../assets/img/floral-1.png"; // Mets ici ton chemin correct vers le logo
import { Link, useLocation } from "react-router-dom";
import UseNavbarInteractions from "../../assets/js/UseNavbarInteractions";
// import DropdownFondements from "./DropdownFondements";

const email = process.env.REACT_APP_EMAIL;
const adresse = process.env.REACT_APP_ADRESSE;
const telephone = process.env.REACT_APP_TELEPHONE;

function LayoutPublic({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const [ads, setAds] = useState([]);

  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;
  useEffect(() => {
    const API = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API}/pages`)
      .then((res) => res.json())
      .then((data) => setPages(data));

    fetch(`${API}/ads`)
      .then((res) => res.json())
      .then((data) => {
        const lastTwoActives = data.filter((ad) => ad.actif === 1).reverse();
        setAds(lastTwoActives);
      });
  }, []);

  const links = pages.map((page) => ({
    label: page.title,
    to: `/${page.slug}`,
  }));

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-blue-950 text-white z-50 shadow-md">
        <div className="container mx-auto px-6">
          {/* Ligne 1 : Logo + Burger */}
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="inline-block">
              <img src={logo} alt="logo" className="w-28 h-28 object-contain" />
            </Link>

            {/* Zone d'affichage pour PC uniquement */}
            <div className="flex items-center gap-6">
              {ads && ads.length > 0 && (
                <div className="hidden lg:flex gap-4">
                  {ads.map((ad, index) => (
                    <Link
                      key={index}
                      to={`/${ad.affiche_lien || "#"}`}
                      className="group block"
                    >
                      <img
                        src={`${STORAGE}/${ad.affiche_image}`}
                        alt={`Affiche ${ad.affiche_titre || "promotion"}`}
                        className="h-[8rem] rounded shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
                      />
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/prayers-request"
                className={`block text-center font-semibold lg:text-lg text-sm lg:px-6 px-4 lg:py-5 py-3 rounded-xl text-white transition duration-300 ${
                  location.pathname === "/prayers-request"
                    ? "bg-yellow-600 shadow-lg"
                    : "bg-yellow-500 hover:bg-yellow-600 hover:shadow-md"
                }`}
              >
                Demande de <br /> prière
              </Link>
            </div>
            {/* Bouton hamburger */}
            <div
              className="lg:hidden text-3xl text-white cursor-pointer z-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i
                className={`ri-${menuOpen ? "close-line" : "menu-4-line"}`}
              ></i>
            </div>
          </div>

          {/* Ligne 2 : Menu */}
          <div
            className={`absolute left-0 w-full bg-blue-950/80 backdrop-blur-sm duration-300 z-40  ${
              menuOpen ? "top-0 h-[100vh]" : "top-[-120vh]"
            } overflow-y-auto lg:static lg:bg-transparent lg:backdrop-blur-0 lg:top-auto lg:h-auto lg:overflow-visible`}
          >
            <ul
              className="flex flex-col justify-center items-center gap-8 py-6 
               lg:flex-wrap lg:justify-center lg:items-center lg:flex-row 
               lg:gap-6 lg:px-6 lg:py-4"
            >
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`nav-link transition duration-300 ${
                      location.pathname === link.to
                        ? "font-bold underline underline-offset-4 text-yellow-500"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <a
                href={`${process.env.REACT_APP_BACKOFFICE_URL}/adherent/login`}
                className="nav-link transition duration-300 hover:text-yellow-500"
              >
                Mon Espace
              </a>
            </ul>
          </div>
        </div>
      </header>

      {/* -------------------------------- */}
      <div className="mt-[8.5rem] lg:mt-[16.4rem] min-h-screen">{children}</div>
      {/* -------------------------------- */}

      <footer
        className={`bg-yellow-50 text-blue-950 mt-10 md:mt-0 pb-10
        ${location.pathname === "/" ? "pt-20 " : "pt-5"} 
        relative`}
      >
        {/* Newsletter */}
        {location.pathname === "/" && (
          <div className="container mx-auto absolute top-auto left-0 right-0 -translate-y-1/2 px-4">
            <div className="bg-blue-900 text-white px-2 py-3 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">
                <span className="text-yellow-400">Souscrivez</span> à notre
                newsletter
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 rounded-md border "
                />
                <button className="bg-blue-950 px-5 py-3 rounded-md text-white hover:opacity-80 duration-300">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Réseaux sociaux */}
        <div className="my-10 flex justify-center space-x-4 text-2xl text-blue-800">
          <a
            href="https://www.facebook.com/Rabbihoremeliekoutouan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-600"
          >
            <i className="ri-facebook-fill cursor-pointer"></i>
          </a>

          {/* <a
    href="https://www.instagram.com/ton-profil"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-yellow-600"
  >
    <i className="ri-instagram-line cursor-pointer"></i>
  </a>

  <a
    href="https://www.youtube.com/@ton-chaine"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-yellow-600"
  >
    <i className="ri-youtube-fill cursor-pointer"></i>
  </a> */}
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Logo */}
          <div>
            <img src={logo} alt="logo" className="mx-auto md:mx-0 w-40 h-40" />
            <p className="mt-4 text-sm opacity-70">
              Une communauté unie par l'Etude de la Torah, par le Service Divin
              et par les Actes de charité et de bienfaisance.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="mb-4 font-bold text-lg">Navigation</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-bold text-lg">Contact</h4>
            <ul className="space-y-1 text-sm">
              <li>📧 {email}</li>
              <li>📍 {adresse}</li>
              <li>📞 {telephone}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 text-sm opacity-60">
          &copy; {new Date().getFullYear()} AsNumeric - J/E. Tous droits
          réservés.
        </div>

        {/* Décoration en bas */}
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <img
            src={floral}
            alt="decor"
            width={400}
            height={200}
            className="opacity-30"
          />
        </div>
      </footer>

      {/* <!--~~~~~~~~~~~~~~~ Scroll Up ~~~~~~~~~~~~~~~--> */}
      <button
        type="button"
        className="fixed right-2 bottom-16 bg-red-500 shadow-lg px-3 py-2 md:px-4 md:py-3 rounded-md text-lg z-50 
    invisible opacity-0 translate-y-4 transition-all duration-300 ease-in-out"
        id="scroll-up"
        aria-label="Scroll to top"
      >
        <i className="ri-arrow-up-line text-white"></i>
      </button>

      <UseNavbarInteractions />
    </>
  );
}
export default LayoutPublic;
