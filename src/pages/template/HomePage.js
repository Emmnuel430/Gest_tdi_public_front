import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
// import Loader from "../../components/Layout/Loader";
import truncate from "html-truncate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";

const HomePage = ({ currentPage }) => {
  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_URL;

    fetch(`${LINK}/api/pages`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setPages(data); // Attention : setPages et non setPage
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
      });
  }, []);

  return (
    <LayoutPublic>
      {/* Hero */}
      {
        <>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            speed={400}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="w-full h-[60vh] "
          >
            {pages.map((page, index) => (
              <SwiperSlide key={index}>
                <Link to={`/${page.slug}`}>
                  <section
                    className={`h-full bg-blue-50 bg-cover bg-center flex items-center justify-center ${
                      page.main_image ? "" : "bg-blue-100"
                    }`}
                    style={
                      page.main_image
                        ? {
                            backgroundImage: `url(${STORAGE}/${page.main_image})`,
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
                        {page.title}
                      </h1>
                      {page.subtitle && (
                        <p className="text-lg text-blue-800">{page.subtitle}</p>
                      )}
                    </div>
                  </section>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Sections dynamiques */}
          {currentPage.sections.map((section, index) => {
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
                    } items-start gap-8`}
                  >
                    {/* Colonne 1 : Texte + sous-sections */}
                    <div className="space-y-6 order-2 lg:order-1 flex-1">
                      {/* Titre / Sous-titre */}
                      <div className={`${isEven ? "text-left" : "text-right"}`}>
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

                      {/* Sous-sections */}
                      {section.subsections.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                          {section.subsections.map((sub) => (
                            <div
                              key={sub.id}
                              className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col h-[320px]"
                            >
                              {/* Image ou placeholder */}
                              <div className="w-full h-32 rounded-t-2xl overflow-hidden">
                                {sub.image ? (
                                  <img
                                    src={`${STORAGE}/${sub.image}`}
                                    alt={sub.title || "Subsection"}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-400">
                                    <i className="fas fa-image fa-2x"></i>
                                  </div>
                                )}
                              </div>

                              {/* Contenu */}
                              <div className="flex flex-col justify-between flex-grow p-4">
                                <div>
                                  {sub.title && (
                                    <h3 className="text-md font-semibold text-blue-900 mb-1">
                                      {sub.title}
                                    </h3>
                                  )}

                                  {(sub.date || sub.prix) && (
                                    <p className="text-xs text-blue-700 mb-2">
                                      {sub.date && (
                                        <span>
                                          {new Date(
                                            sub.date
                                          ).toLocaleDateString()}
                                        </span>
                                      )}
                                      {sub.date && sub.prix && " · "}
                                      {sub.prix && <span>{sub.prix} €</span>}
                                    </p>
                                  )}
                                </div>

                                {/* Description en bas */}
                                <div className="text-sm text-blue-800 mt-2 overflow-hidden">
                                  {sub.content && (
                                    <>
                                      <div
                                        className="line-clamp-3 text-sm"
                                        dangerouslySetInnerHTML={{
                                          __html: truncate(sub.content, 100),
                                        }}
                                      />
                                      {sub.content.replace(/<[^>]*>?/gm, "")
                                        .length > 100 && (
                                        <Link
                                          to={`/subsection/${sub.id}`}
                                          className="border border-blue-600 text-blue-600 hover:underline inline-block mt-2 p-1 rounded-md text-xs"
                                        >
                                          Lire plus →
                                        </Link>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Colonne 2 : Image principale */}
                    <div className="order-1 lg:order-2 flex justify-center w-full lg:w-[40%]">
                      {section.image ? (
                        <img
                          src={`${STORAGE}/${section.image}`}
                          alt={section.title || "Section"}
                          className="rounded-2xl w-full max-h-[300px] object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-full h-[300px] bg-blue-100 rounded-2xl flex items-center justify-center text-blue-400 shadow-lg">
                          <i className="fas fa-image fa-2x"></i>
                        </div>
                      )}
                    </div>
                  </div>
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
