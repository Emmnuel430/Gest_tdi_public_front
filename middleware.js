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

const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN; // définis dans Vercel > Settings > Environment Variables

export default async function middleware(request) {
  // logique de bot / prerender
  const ua = request.headers.get("user-agent") || "";
  if (BOT_UA_REGEX.test(ua)) {
    const url = new URL(request.url);
    const prerenderUrl = `https://service.prerender.io/${url.origin}${url.pathname}${url.search}`;
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
  }
  // sinon laisser passer
  return Response.next(); // ou `return new Response(null, { status: 200 });`
}
