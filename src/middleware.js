// middleware.js - Vercel Edge Middleware pour React SPA + Prerender.io
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
      .map((s) => s.replace(/\./g, "\\.")) // échapper les points pour regex
      .join("|") +
    ")",
  "i"
);

const PRERENDER_SERVICE = "https://service.prerender.io";
const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN; // définis dans Vercel > Settings > Environment Variables

export async function middleware(request) {
  const ua = request.headers.get("user-agent") || "";
  const url = new URL(request.url);

  // Ne traiter que les GET (évite images, scripts, etc.)
  if (request.method !== "GET") {
    return new Response(null, { status: 200 });
  }

  // ✅ Cas 1 : si c’est un bot → on sert la version Prerender
  if (BOT_UA_REGEX.test(ua)) {
    const target = `${PRERENDER_SERVICE}/${url.origin}${url.pathname}${url.search}`;

    const prerenderRes = await fetch(target, {
      method: "GET",
      headers: {
        "X-Prerender-Token": PRERENDER_TOKEN || "",
        "User-Agent": ua,
        Accept: "text/html",
      },
    });

    if (prerenderRes.ok) {
      const body = await prerenderRes.text();
      return new Response(body, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Prerender error", { status: 502 });
  }

  // ✅ Cas 2 : utilisateur normal → on laisse passer à React
  return new Response(null, { status: 200 });
}
