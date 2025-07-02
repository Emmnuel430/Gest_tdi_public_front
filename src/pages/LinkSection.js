import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const STORAGE = `${process.env.REACT_APP_API_URL}/storage`;

const extractYoutubeUrl = (html) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = html?.match(regex);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
};

const getYoutubeThumbnail = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
};

export default function LinkSection() {
  const [section7, setSection7] = useState(null);

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_URL;

    fetch(`${LINK}/api/pages`)
      .then((res) => res.json())
      .then((pages) => {
        const accueilPage = pages.find((p) => p.slug === "accueil");
        const section = accueilPage?.sections.find((s) => s.order === 7);
        if (section) setSection7(section);
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
      });
  }, []);

  if (!section7) return null;

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {section7.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
            {section7.title}
          </h2>
        )}

        <Swiper
          modules={[Pagination, Autoplay]}
          speed={600}
          loop={true}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper min-h-[320px]"
        >
          {section7.subsections.map((sub) => {
            const youtubeUrl = extractYoutubeUrl(sub.content);
            const thumbnail = youtubeUrl
              ? getYoutubeThumbnail(youtubeUrl)
              : null;

            return (
              <SwiperSlide key={sub.id}>
                <div className="bg-white rounded-xl shadow-md flex flex-col h-[280px] overflow-hidden relative">
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
                  <div className="p-3 text-center">
                    <h5 className="text-md font-semibold text-blue-900">
                      {sub.title}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-pagination mt-6"></div>
      </div>
    </div>
  );
}
