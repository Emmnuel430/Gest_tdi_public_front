import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Layout/Loader";
import HomePage from "./HomePage";
import StandardPage from "./StandardPage";
import ShopPage from "./ShopPage";

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_URL;
    fetch(`${LINK}/api/pages/${slug || "acceuil"}`) // slug vide = accueil
      .then((res) => res.json())
      .then((data) => setPage(data));
  }, [slug]);

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
    default:
      return <StandardPage page={page} />;
  }
}
