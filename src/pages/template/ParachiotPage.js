import React from "react";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
import Loader from "../../components/Layout/Loader";
import { Link } from "react-router-dom";
// import truncate from "html-truncate";

const ParachiotPage = ({ page }) => {
  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const htmlToTextWithLineBreaks = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    // Ajoute des retours à la ligne après certains blocs
    const blockTags = ["P", "BR", "DIV", "LI", "H1", "H2", "H3", "H4"];
    blockTags.forEach((tag) => {
      const elements = div.getElementsByTagName(tag);
      for (let el of elements) {
        if (el.nextSibling) {
          el.insertAdjacentText("afterend", "\n");
        }
      }
    });

    const text = div.textContent || div.innerText || "";
    return text.replace(/\n{2,}/g, "\n").trim(); // nettoie les multiples \n
  };

  const getPreview = (html, maxLength = 150) => {
    const plainText = htmlToTextWithLineBreaks(html);
    return plainText.length > maxLength
      ? plainText.slice(0, maxLength) + "..."
      : plainText;
  };

  const sections = page.sections || [];
  const lastSection =
    sections.length > 0 ? sections[sections.length - 1] : null;
  const otherSections =
    sections.length > 1 ? sections.slice(0, sections.length - 1) : [];

  return (
    <LayoutPublic>
      {/* En-tête de page */}
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
            : {
                backgroundColor: "#f0f9ff", // Couleur de fond si pas d'image
                backgroundSize: "cover",
              }
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
      <section className="px-4 md:px-16 bg-white pb-20">
        <div className="space-y-12">
          {lastSection && (
            <div
              key={lastSection.id}
              className="bg-yellow-50 p-6 rounded-2xl shadow hover:shadow-md transition flex"
            >
              {/* Image + Texte Section principale */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {lastSection.image && (
                  <div className="w-full lg:w-1/2">
                    <img
                      src={`${STORAGE}/${lastSection.image}`}
                      alt={lastSection.title}
                      className="rounded-xl max-h-[300px] w-full object-cover shadow"
                    />
                  </div>
                )}

                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-3xl font-extrabold text-2xl text-yellow-900 mb-2">
                    {lastSection.title}
                  </h2>
                  {lastSection.subtitle && (
                    <p className="text-yellow-800 text-sm">
                      {lastSection.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Sous-sections comme d’habitude */}
              {lastSection.subsections.length > 0 && (
                <div className="grid gap-6 grid-cols-1mt-4">
                  {lastSection.subsections.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
                    >
                      {sub.image && (
                        <img
                          src={`${STORAGE}/${sub.image}`}
                          alt={sub.title || "Subsection"}
                          className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                      )}
                      {sub.title && (
                        <h3 className="text-lg font-semibold text-yellow-900 mb-1">
                          {sub.title}
                        </h3>
                      )}
                      {(sub.date || sub.prix) && (
                        <p className="text-sm text-yellow-700 mb-2">
                          {sub.date && (
                            <span>
                              {new Date(sub.date).toLocaleDateString()}
                            </span>
                          )}
                          {sub.date && sub.prix && " · "}
                          {sub.prix && <span>{sub.prix} €</span>}
                        </p>
                      )}
                      {sub.content && (
                        <div className="text-sm text-yellow-800 whitespace-pre-line flex-grow flex flex-col justify-between">
                          <div>{getPreview(sub.content, 150)}</div>
                          {htmlToTextWithLineBreaks(sub.content).length >
                            150 && (
                            <Link
                              to={`/subsection/${sub.id}`}
                              className="text-yellow-600 hover:underline border p-2 inline-block mt-2 w-max"
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
          )}

          {/* Les autres sections normales */}
          {otherSections.map((section) => (
            <div
              key={section.id}
              className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              {/* ... le même rendu que tu as déjà ... */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {section.image && (
                  <div className="w-full lg:w-1/3">
                    <img
                      src={`${STORAGE}/${section.image}`}
                      alt={section.title}
                      className="rounded-xl max-h-[300px] w-full object-cover shadow"
                    />
                  </div>
                )}

                <div className="w-full lg:w-2/3 text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-gray-700 text-sm">{section.subtitle}</p>
                  )}
                </div>
              </div>

              {section.subsections.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 mt-4">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
                    >
                      {sub.image && (
                        <img
                          src={`${STORAGE}/${sub.image}`}
                          alt={sub.title || "Subsection"}
                          className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                      )}
                      {sub.title && (
                        <h3 className="text-lg font-semibold text-blue-900 mb-1">
                          {sub.title}
                        </h3>
                      )}
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
                      {sub.content && (
                        <div className="text-sm text-blue-800 whitespace-pre-line flex-grow flex flex-col justify-between">
                          <div>{getPreview(sub.content, 150)}</div>
                          {htmlToTextWithLineBreaks(sub.content).length >
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
          ))}
        </div>
      </section>
    </LayoutPublic>
  );
};

export default ParachiotPage;
