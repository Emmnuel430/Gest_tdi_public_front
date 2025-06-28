import React from "react";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
import Loader from "../../components/Layout/Loader";
import { Link } from "react-router-dom";
import truncate from "html-truncate";
import AdhesionForm from "../forms/AdhesionForm";

const MembresTemplate = ({ page }) => {
  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;
  const sections = page.sections || [];
  const sectionCharte = sections[0];
  const sectionAdhesion = sections[1];
  const otherSections = sections.slice(2);

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <LayoutPublic>
      {/* En-tête de page */}
      <section
        className={`${
          page.main_image ? "" : "bg-blue-100"
        } h-[50vh] bg-cover bg-center flex items-center justify-center`}
        style={
          page.main_image
            ? {
                backgroundImage: `url(${STORAGE}/${page.main_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "#f0f9ff", backgroundSize: "cover" }
        }
      >
        <div className="max-w-xl bg-white/80 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-lg text-blue-800">{page.subtitle}</p>
          )}
        </div>
      </section>

      {/* Section 1 : La Charte */}
      {sectionCharte && (
        <section className="mb-10 text-center px-4">
          <h2 className="text-2xl font-semibold mb-2">{sectionCharte.title}</h2>
          {sectionCharte.subtitle && (
            <p className="text-gray-700">{sectionCharte.subtitle}</p>
          )}
          {sectionCharte.subsections &&
            sectionCharte.subsections.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {sectionCharte.subsections.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
                  >
                    {/* Image */}
                    {sub.image && (
                      <img
                        src={`${STORAGE}/${sub.image}`}
                        alt={sub.title || "Subsection"}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                      />
                    )}

                    {/* Titre */}
                    {sub.title && (
                      <h3 className="text-lg font-semibold text-blue-900 mb-1">
                        {sub.title}
                      </h3>
                    )}

                    {/* Date + Prix (infos complémentaires) */}
                    {(sub.date || sub.prix) && (
                      <p className="text-sm text-blue-700 mb-2">
                        {sub.date && (
                          <span>{new Date(sub.date).toLocaleDateString()}</span>
                        )}
                        {sub.date && sub.prix && " · "}
                        {sub.prix && <span>{sub.prix} €</span>}
                      </p>
                    )}

                    {/* Contenu HTML */}
                    {sub.content && (
                      <div className="text-sm text-blue-800 flex-grow flex flex-col justify-between">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: truncate(sub.content, 150),
                          }}
                        />
                        {sub.content &&
                          sub.content.replace(/<[^>]*>?/gm, "").length >
                            150 && (
                            <Link
                              to={`/subsection/${sub.id}`}
                              className="text-blue-600 hover:underline border p-2 inline-block mt-2 w-max"
                            >
                              Lire plus →
                            </Link>
                          )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
        </section>
      )}

      <hr className="my-2 border-t border-gray-300" />

      {/* Section 2 : Fiche d’adhésion */}
      {sectionAdhesion && (
        <section className="mt-4 text-center px-2">
          <h2 className="text-2xl font-semibold mb-3">
            {sectionAdhesion.title}
          </h2>
          <p className="text-gray-700 mb-5">
            Cliquez sur le bouton ci-dessous pour nous rejoindre sur WhatsApp.
          </p>
          <a
            href={sectionAdhesion.subtitle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Nous rejoindre
          </a>
        </section>
      )}
      {/* Formulaire d'adhésion */}
      <section className="my-12 px-4">
        <AdhesionForm />
      </section>
      {/* Autres sections (avec sous-sections) */}
      {otherSections.length > 0 && (
        <div className="mt-16 px-4">
          {otherSections.map((section) => (
            <section key={section.id} className="mb-12">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                {section.title}
              </h3>

              {section.subtitle && (
                <p className="text-gray-700 mb-4">{section.subtitle}</p>
              )}

              {section.subsections && section.subsections.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 bg-white rounded shadow hover:shadow-lg transition"
                    >
                      <h4 className="font-bold text-lg mb-2">{sub.title}</h4>
                      {sub.content && (
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{ __html: sub.content }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </LayoutPublic>
  );
};

export default MembresTemplate;
