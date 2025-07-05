import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Layout/Loader";
import HomePage from "./HomePage";
import StandardPage from "./StandardPage";
import ShopPage from "./ShopPage";
import Dons from "./Dons";
import NotFound from "../NotFound"; // ⬅️ Le composant 404
import MembresTemplate from "./MembresTemplate";
import ParachiotPage from "./ParachiotPage";

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [notFound, setNotFound] = useState(false); // ⬅️ Pour gérer la 404

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_URL;
    const slugToUse = slug || "accueil";

    fetch(`${LINK}/api/pages/${slugToUse}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true); // ⬅️ Activer la 404
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          // Si c’est la page d'accueil, on enlève la section d'ordre 7
          if (slugToUse === "accueil") {
            const sectionsSans7 = data.sections.filter(
              (section) => section.order !== 7
            );
            setPage({ ...data, sections: sectionsSans7 });
          } else {
            setPage(data);
          }
        }
        // console.log(data);
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
        setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return <NotFound />;
  }

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  switch (page.template) {
    case "accueil":
      return <HomePage page={page} />;
    case "boutique":
      return <ShopPage page={page} />;
    case "membres":
      return <MembresTemplate page={page} />;
    case "dons":
      return <Dons page={page} />;
    case "parachiot":
      return <ParachiotPage page={page} />;
    default:
      return <StandardPage page={page} />;
  }
}
