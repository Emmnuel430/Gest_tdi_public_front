import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";

export default function SubsectionDetail() {
  const { id } = useParams();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  const LINK = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${LINK}/api/subsections/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur de chargement");
        }
        return res.json();
      })
      .then((data) => {
        setSub(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id, LINK]);

  return (
    <LayoutPublic>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : !sub ? (
        <p className="text-center text-red-500">Contenu introuvable.</p>
      ) : (
        <>
          <div className="max-w-4xl mt-[11rem] lg:mt-[15rem] mb-3 mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
            {/* Titre */}
            <h2 className="text-3xl font-semibold text-gray-800">
              {sub.title}
            </h2>

            {/* Date */}
            {sub.date && (
              <p className="text-sm text-gray-500">
                📅 {new Date(sub.date).toLocaleDateString()}
              </p>
            )}

            {/* Image */}
            {sub.image && (
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={`${LINK}/storage/${sub.image}`}
                  alt={sub.title}
                  className="w-full max-h-[60vh] object-cover"
                />
              </div>
            )}

            {/* Contenu HTML */}
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: sub.content }}
            />
          </div>
        </>
      )}
    </LayoutPublic>
  );
}
