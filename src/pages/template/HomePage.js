import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import LinkSection from "../LinkSection";

const HomePage = ({ page }) => {
  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_URL;

    fetch(`${LINK}/api/pages`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setPages(data);
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
      });
  }, []);

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

  return (
    <LayoutPublic>
      {/* Hero */}
      {
        <>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            speed={400}
            loop={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="w-full h-[60vh] "
          >
            {pages.map((p, index) => (
              <SwiperSlide key={index}>
                <Link to={`/${p.slug}`}>
                  <section
                    className={`h-full bg-blue-50 bg-cover bg-center flex items-center justify-center ${
                      p.main_image ? "" : "bg-blue-100"
                    }`}
                    style={
                      p.main_image
                        ? {
                            backgroundImage: `url(${STORAGE}/${p.main_image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {
                            // backgroundColor: "#f0f9ff",
                            // backgroundSize: "cover",
                          }
                    }
                  >
                    <div className="max-w-xl bg-white/80 p-8 rounded-lg shadow-lg text-center">
                      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                        {p.title}
                      </h1>
                      {p.subtitle && (
                        <p className="text-lg text-blue-800">{p.subtitle}</p>
                      )}
                    </div>
                  </section>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Sections dynamiques */}
          {page.sections.map((section) => (
            <section
              key={section.id}
              className="w-full bg-gray-100 py-16 px-4 md:px-8 lg:px-16 text-center"
            >
              <div className="max-w-screen-xl mx-auto space-y-8">
                {/* Titre de la section */}
                {section.title && (
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                    {section.title}
                  </h2>
                )}

                {/* Sous-titre */}
                {section.subtitle && (
                  <p className="text-blue-800 text-md lg:text-lg max-w-2xl mx-auto">
                    {section.subtitle}
                  </p>
                )}

                {/* Image */}
                {section.image && (
                  <div className="flex justify-center">
                    <img
                      src={`${STORAGE}/${section.image}`}
                      alt={section.title || "Section"}
                      className="rounded-xl w-full max-w-md h-[300px] object-contain shadow"
                    />
                  </div>
                )}

                {/* Sous-sections */}
                {section.subsections.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {section.subsections.slice(0, 6).map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition p-2 flex flex-col overflow-hidden"
                      >
                        {/* Image sous-section */}
                        <div className="w-full h-[120px] flex items-center justify-center bg-white">
                          {sub.image ? (
                            <img
                              src={`${STORAGE}/${sub.image}`}
                              // src="/404-error.png"
                              alt={sub.title}
                              className="h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-400">
                              <i className="fas fa-image fa-lg"></i>
                            </div>
                          )}
                        </div>

                        {/* Texte sous-section */}
                        <div className="p-3 text-blue-900 flex flex-col justify-between flex-grow">
                          <div>
                            <h5 className="text-md font-semibold">
                              {sub.title}
                            </h5>
                            {(sub.date || sub.prix) && (
                              <p className="text-sm text-blue-700 mb-2">
                                {sub.date &&
                                  new Date(sub.date).toLocaleDateString()}
                                {sub.date && sub.prix && " · "}
                                {sub.prix && `${sub.prix} €`}
                              </p>
                            )}
                          </div>
                          {sub.content && (
                            <div className="text-sm text-blue-800 mt-2">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: getPreview(sub.content, 100),
                                }}
                              />
                              {htmlToTextWithLineBreaks(sub.content).length >
                                100 && (
                                <Link
                                  to={`/subsection/${sub.id}`}
                                  className="text-blue-600 hover:underline text-xs mt-2 inline-block p-2 border border-blue-600"
                                >
                                  Lire plus →
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          <LinkSection />
        </>
      }
    </LayoutPublic>
  );
};

export default HomePage;
