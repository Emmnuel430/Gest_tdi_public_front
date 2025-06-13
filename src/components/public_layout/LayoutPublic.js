import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png"; // Mets ici ton chemin correct vers le logo
import floral from "../../assets/img/floral-1.png"; // Mets ici ton chemin correct vers le logo
import { Link, useLocation } from "react-router-dom";
import UseNavbarInteractions from "../../assets/js/UseNavbarInteractions";
// import DropdownFondements from "./DropdownFondements";

function LayoutPublic({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const API = process.env.REACT_APP_API_BASE_URL;
    fetch(`${API}/pages`)
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  const links = pages.map((page) => ({
    label: page.title,
    to: `/${page.slug}`,
  }));

  const email = process.env.REACT_APP_EMAIL;
  const adresse = process.env.REACT_APP_ADRESSE;
  const telephone = process.env.REACT_APP_TELEPHONE;

  // const links = [
  //   { to: "/", label: "ACCUEIL" },
  //   { to: "/parachiot", label: "LES PARACHIOT" },
  //   { to: "/etudes", label: "ETUDE" },
  //   { to: "/boutique", label: "BOUTIQUE" },
  // ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-blue-950 text-white z-50 shadow-md">
        <div className="container mx-auto px-6">
          {/* Ligne 1 : Logo + Burger */}
          <div className="flex justify-between items-center py-3">
            <img src={logo} alt="logo" className="w-30 h-30" />

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
            className={`absolute left-0 w-full bg-blue-950/80 backdrop-blur-sm duration-300 z-40 ${
              menuOpen ? "top-[80px]" : "top-[-100vh]"
            } 
      lg:static lg:bg-transparent lg:backdrop-blur-0 lg:top-auto`}
          >
            <ul className="flex flex-col justify-center items-center gap-8 py-6 lg:flex-row lg:py-4 h-[100vh] lg:h-auto">
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
              {/* <DropdownFondements /> */}
            </ul>
          </div>
        </div>
      </header>

      {/* -------------------------------- */}
      <div className="mt-[9rem] lg:mt-[12rem] min-h-screen">{children}</div>
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
          <i className="ri-facebook-fill hover:text-yellow-600 cursor-pointer"></i>
          <i className="ri-instagram-line hover:text-yellow-600 cursor-pointer"></i>
          <i className="ri-youtube-fill hover:text-yellow-600 cursor-pointer"></i>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Logo */}
          <div>
            <img src={logo} alt="logo" className="mx-auto md:mx-0 w-40 h-40" />
            <p className="mt-4 text-sm opacity-70">
              Une communauté unie par l'Etude de la Torah, par le Service Divin
              et par les Actes de charités et de bienfaisance.
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
