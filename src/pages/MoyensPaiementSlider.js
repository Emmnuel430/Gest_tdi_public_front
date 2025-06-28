import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Loader from "../components/Layout/Loader";

const LINK = process.env.REACT_APP_API_URL;
const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;

const MoyensPaiementSlider = () => {
  const [subsections, setSubsections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTsedaqaPage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${LINK}/api/pages/tsedaka`);
        const data = await res.json();

        // Regrouper toutes les sous-sections de toutes les sections
        const allSubs = data.sections.flatMap((section) => section.subsections);
        setSubsections(allSubs);
      } catch (err) {
        console.error("Erreur de chargement des moyens de paiement", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTsedaqaPage();
  }, []);

  if (subsections.length === 0) return null;

  return (
    <div className="py-10">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }} // Centrer Loader au milieu de l'écran
        >
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
            Moyens de Paiement
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            speed={400}
            loop={true}
            spaceBetween={30}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="min-h-[320px]"
          >
            {subsections.map((sub) => (
              <SwiperSlide key={sub.id}>
                <div className="bg-white rounded-xl shadow-md h-[280px] overflow-hidden flex flex-col">
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
                  <div className="p-4 text-center">
                    <h5 className="text-md font-semibold text-blue-900 mb-1">
                      {sub.title}
                    </h5>
                    <div
                      className="text-sm text-blue-800"
                      dangerouslySetInnerHTML={{ __html: sub.content }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination mt-6"></div>
          </Swiper>
        </>
      )}
    </div>
  );
};

export default MoyensPaiementSlider;
