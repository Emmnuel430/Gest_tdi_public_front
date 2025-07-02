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
          {page.sections.map((section, index) => {
            const isEven = index % 2 === 0;
            // const isLast = index === page.sections.length - 1;

            return (
              <section
                key={section.id}
                className="w-full bg-gray-100 py-16 px-4 md:px-8 lg:px-16"
              >
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
                  <div
                    className={`flex flex-col lg:flex-row ${
                      isEven ? "" : "lg:flex-row-reverse"
                    } gap-8`}
                  >
                    {/* Partie image + titre + texte */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-center">
                      {section.image && (
                        <img
                          src={`${STORAGE}/${section.image}`}
                          // src={`/404-error.png`}
                          alt={section.title || "Section"}
                          className="rounded-xl w-full max-w-md h-[300px] object-contain mb-6"
                        />
                      )}
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

                    {/* Partie sous-sections */}
                    <div className="w-full lg:w-1/2">
                      {section.subsections.length > 0 && (
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
                            pagination={{ clickable: true }}
                            grabCursor={true}
                            className="swiper min-h-[320px]"
                          >
                            {section.subsections.map((sub) => (
                              <SwiperSlide key={sub.id}>
                                <div className="bg-white rounded-xl shadow-md flex flex-col justify-between h-[280px] overflow-hidden">
                                  {/* Image sous-section */}
                                  <div className="w-full h-[120px] flex items-center justify-center bg-white">
                                    {sub.image ? (
                                      <img
                                        src={`${STORAGE}/${sub.image}`}
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
                                  <div className="p-3 text-blue-900">
                                    <h5 className="text-md font-semibold">
                                      {sub.title}
                                    </h5>
                                    {(sub.date || sub.prix) && (
                                      <p className="text-sm text-blue-700 mb-2">
                                        {sub.date &&
                                          new Date(
                                            sub.date
                                          ).toLocaleDateString()}
                                        {sub.date && sub.prix && " · "}
                                        {sub.prix && `${sub.prix} €`}
                                      </p>
                                    )}
                                    {sub.content && (
                                      <div className="text-sm text-blue-800">
                                        <div>
                                          {getPreview(sub.content, 100)}
                                        </div>
                                        {htmlToTextWithLineBreaks(sub.content)
                                          .length > 100 && (
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
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div className="swiper-pagination mt-6"></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
          <LinkSection />
        </>
      }
    </LayoutPublic>
  );
};

export default HomePage;
