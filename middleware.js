// middleware.js (React SPA - Edge routing middleware)
const BOT_UA_REGEX = new RegExp(
  "(" +
    [
      "googlebot",
      "yahoo",
      "bingbot",
      "yandex",
      "baiduspider",
      "facebookexternalhit",
      "twitterbot",
      "rogerbot",
      "linkedinbot",
      "embedly",
      "bufferbot",
      "quora link preview",
      "showyoubot",
      "outbrain",
      "pinterest",
      "pinterest/0\\.",
      "developers\\.google\\.com/\\+/web/snippet",
      "www\\.google\\.com/webmasters/tools/richsnippets",
      "slackbot",
      "vkShare",
      "W3C_Validator",
      "redditbot",
      "Applebot",
      "WhatsApp",
      "flipboard",
      "tumblr",
      "bitlybot",
      "SkypeUriPreview",
      "nuzzel",
      "Discordbot",
      "Google Page Speed",
      "Qwantify",
    ]
      .map((s) => s.replace(/\./g, "\\."))
      .join("|") +
    ")",
  "i"
);

const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN;

export async function middleware(request) {
  try {
    const ua = request.headers.get("user-agent") || "";

    if (BOT_UA_REGEX.test(ua)) {
      const url = new URL(request.url);
      const prerenderUrl = `https://service.prerender.io${url.pathname}${url.search}`;

      const res = await fetch(prerenderUrl, {
        headers: {
          "X-Prerender-Token": PRERENDER_TOKEN || "",
          "User-Agent": ua,
          Accept: "text/html",
        },
      });

      if (res.ok) {
        const html = await res.text();
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }

      // si prerender retourne erreur
      return new Response("Erreur Prerender", { status: 502 });
    }

    // Pas un bot : laisser passer
    return Response.next();
  } catch (err) {
    console.error("Erreur middleware :", err);
    // fallback : laisser passer
    return Response.next();
  }
}

// Optionnel : config matcher pour ne pas intercepter assets statiques
export const config = {
  matcher: [
    // intercepter tout sauf fichiers statiques
    "/((?!_next/static|favicon.ico|.*\\.(js|css|png|jpg|svg)).*)",
  ],
};
