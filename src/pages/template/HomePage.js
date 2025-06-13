import React from "react";
import { Link } from "react-router-dom";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
// import Loader from "../../components/Layout/Loader";
import truncate from "html-truncate";

import "swiper/css";

const HomePage = ({ page }) => {
  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;

  return (
    <LayoutPublic>
      {/* Hero */}
      {
        <>
          <section
            className={`${
              page.main_image ? "" : "bg-blue-100"
            }h-[50vh] bg-cover bg-center flex items-center justify-center`}
            style={
              page.main_image
                ? {
                    backgroundImage: `url(${STORAGE}/${page.main_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
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

          {/* Sections dynamiques */}
          {page.sections.map((section, index) => {
            const isEven = index % 2 === 0;
            return (
              <section
                key={section.id}
                className="w-full py-16 bg-gray-100 px-4 md:px-8 lg:px-16"
              >
                <div className="max-w-screen-xl mx-auto space-y-8">
                  {/* Bloc principal section */}
                  <div
                    className={`flex flex-col lg:flex-row ${
                      !isEven ? "lg:flex-row-reverse" : ""
                    } items-center gap-8`}
                  >
                    {/* Texte */}
                    <div
                      className={`lg:w-2/3 text-center ${
                        !isEven ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-blue-800 text-md lg:text-lg mb-2">
                          {section.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Image */}
                    {section.image && (
                      <div className="lg:w-1/3 flex justify-center">
                        <img
                          src={`${STORAGE}/${section.image}`}
                          alt={section.title || "Section"}
                          className="rounded-2xl max-w-full max-h-[45vh] object-cover shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Sous-sections */}
                  {section.subsections.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                      {section.subsections.map((sub) => (
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
                                <span>
                                  {new Date(sub.date).toLocaleDateString()}
                                </span>
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
                </div>
              </section>
            );
          })}
        </>
      }
    </LayoutPublic>
  );
};

export default HomePage;
