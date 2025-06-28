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

  const extractYoutubeUrl = (html) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = html?.match(regex);
    return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
  };

  const getYoutubeThumbnail = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
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
            const isLast = index === currentPage.sections.length - 1;

            return (
              <section
                key={section.id}
                className="w-full bg-gray-100 py-16 px-4 md:px-8 lg:px-16"
              >
                <div className="max-w-screen-xl mx-auto space-y-10">
                  {/* Image + Texte */}
                  <div
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center justify-center gap-8`}
                  >
                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                      {section.image && (
                        <img
                          src={`${STORAGE}/${section.image}`}
                          alt={section.title || "Section"}
                          className="rounded-2xl w-full max-w-md h-[300px] object-cover shadow-lg"
                        />
                      )}
                    </div>

                    {/* Texte */}
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
                  {section.subsections.length > 0 &&
                    (isLast ? (
                      // ✅ Swiper Carousel
                      <>
                        <Swiper
                          modules={[Pagination, Autoplay]}
                          speed={600}
                          loop={true}
                          spaceBetween={30}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          pagination={{
                            el: ".swiper-pagination",
                            clickable: true,
                          }}
                          grabCursor={true}
                          breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                          }}
                          className="swiper min-h-[320px]"
                        >
                          {section.subsections.map((sub) => {
                            const youtubeUrl = extractYoutubeUrl(sub.content);
                            const thumbnail = youtubeUrl
                              ? getYoutubeThumbnail(youtubeUrl)
                              : null;

                            return (
                              <SwiperSlide key={sub.id}>
                                <div className="bg-white rounded-xl shadow-md flex flex-col h-[280px] overflow-hidden">
                                  <div className="h-full w-full overflow-hidden">
                                    {thumbnail ? (
                                      <a
                                        href={youtubeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={thumbnail}
                                          alt={sub.title}
                                          className="w-full h-full object-cover"
                                        />
                                        {/* Icône de lecture */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-md">
                                            <i className="fas fa-play text-blue-600 text-xl ml-1"></i>
                                          </div>
                                        </div>
                                      </a>
                                    ) : sub.image ? (
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

                                  <div className="p-3 flex flex-col justify-between flex-grow">
                                    <div>
                                      <h5 className="text-md font-semibold text-blue-900">
                                        {sub.title}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                        <div className="swiper-pagination mt-6"></div>
                      </>
                    ) : (
                      // 🧱 Grille classique pour les autres sections
                      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {section.subsections
                          .slice(0, 3) // Limite à 3 sous-sections
                          .map((sub) => (
                            <div
                              key={sub.id}
                              className="bg-white rounded-xl shadow-md flex flex-col"
                            >
                              {/* Image adaptative */}
                              <div className="w-full h-[50%] flex items-center justify-center bg-white">
                                {sub.image ? (
                                  <img
                                    src={`${STORAGE}/${sub.image}`}
                                    alt={sub.title}
                                    className="h-full object-contain"
                                  />
                                ) : (
                                  <div className="w-full h-[120px] bg-blue-100 flex items-center justify-center text-blue-400">
                                    <i className="fas fa-image fa-lg"></i>
                                  </div>
                                )}
                              </div>

                              {/* Texte */}
                              <div className="p-3 flex flex-col justify-between flex-grow max-h-[220px]">
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
                                <div className="text-sm text-blue-800 mt-2 overflow-hidden">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: truncate(sub.content, 100),
                                    }}
                                  />
                                  {sub.content.replace(/<[^>]*>?/gm, "")
                                    .length > 100 && (
                                    <Link
                                      to={`/subsection/${sub.id}`}
                                      className="border border-blue-600 p-2 text-blue-600 hover:underline text-xs mt-2 inline-block"
                                    >
                                      Lire plus →
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
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
