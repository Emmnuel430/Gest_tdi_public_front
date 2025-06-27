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
                className="w-full bg-gray-100 py-16 px-4 md:px-8 lg:px-16"
              >
                <div className="max-w-screen-xl mx-auto space-y-10">
                  {/* Image & texte disposition */}
                  <div
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center justify-center gap-8`}
                  >
                    {/* Image de section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                      {section.image ? (
                        <img
                          src={`${STORAGE}/${section.image}`}
                          alt={section.title || "Section"}
                          className="rounded-2xl w-full max-w-md h-[300px] object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-full max-w-md h-[300px] bg-blue-100 rounded-2xl flex items-center justify-center text-blue-400 shadow-lg">
                          <i className="fas fa-image fa-2x"></i>
                        </div>
                      )}
                    </div>

                    {/* Titre et sous-titre */}
                    <div className="w-full lg:w-1/2 text-center">
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-blue-800 text-md lg:text-lg">
                          {section.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sous-sections */}
                  {section.subsections.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {section.subsections.map((sub) => (
                        <div
                          key={sub.id}
                          className="bg-white rounded-xl shadow-md flex flex-col h-[280px] overflow-hidden"
                        >
                          {/* Image ou placeholder */}
                          <div className="h-28 w-full overflow-hidden">
                            {sub.image ? (
                              <img
                                src={`${STORAGE}/${sub.image}`}
                                alt={sub.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-400">
                                <i className="fas fa-image fa-lg"></i>
                              </div>
                            )}
                          </div>

                          {/* Contenu texte */}
                          <div className="p-3 flex flex-col justify-between flex-grow">
                            <div>
                              <h5 className="text-md font-semibold text-blue-900">
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

                            <div className="text-sm text-blue-800 mt-2 flex-grow overflow-hidden">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: truncate(sub.content, 100),
                                }}
                              />
                              {sub.content.replace(/<[^>]*>?/gm, "").length >
                                100 && (
                                <Link
                                  to={`/subsection/${sub.id}`}
                                  className="text-blue-600 hover:underline text-xs mt-2 inline-block"
                                >
                                  Lire plus →
                                </Link>
                              )}
                            </div>
                          </div>
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
