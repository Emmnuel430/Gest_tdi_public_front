import React from "react";
import LayoutPublic from "../../components/public_layout/LayoutPublic";

const Dons = ({ page }) => {
  // const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;
  return (
    <LayoutPublic>
      {/* En-tête */}
      {/* <section
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
      </section> */}

      {/* Contenu dons */}
      <section className="container mx-auto px-4 py-12">
        {page.sections.map((section) => (
          <div
            key={section.id}
            className="mb-16 bg-blue-950 p-4 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold text-center text-white mb-8">
              {section.title}
            </h2>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {section.subsections.map((sub, index) => (
                <div
                  key={index}
                  className="w-full max-w-xs bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between min-h-[300px]"
                >
                  <div className="text-center">
                    {sub.image && (
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${sub.image}`}
                        alt={sub.title}
                        className="w-full h-48 object-contain rounded mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {sub.title}
                    </h3>
                    <div
                      className="text-sm text-blue-700 mb-4"
                      dangerouslySetInnerHTML={{ __html: sub.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </LayoutPublic>
  );
};

export default Dons;
