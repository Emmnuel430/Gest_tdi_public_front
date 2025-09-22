import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    const GA_ID = process.env.REACT_APP_GA_ID;

    // Charger le script gtag.js
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // Initialiser GA
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", GA_ID);
  }, []);

  return null;
};

export default GoogleAnalytics;
