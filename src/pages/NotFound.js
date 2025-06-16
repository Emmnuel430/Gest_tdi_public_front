import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-red-500 max-w-4xl w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Texte */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Page non trouvée
            </h1>
            <p className="text-gray-600 mb-6">
              Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300"
            >
              Retour à l’accueil
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 text-center">
            <img
              src="/404-error.png"
              alt="404 Not Found"
              className="w-full max-w-xs mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
