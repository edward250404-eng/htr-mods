// Вход в админку через GitHub (вместо Netlify).
// Нужны две секретные переменные в Cloudflare: GITHUB_CLIENT_ID и GITHUB_CLIENT_SECRET.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const state = crypto.randomUUID();
      const gh = new URL("https://github.com/login/oauth/authorize");
      gh.searchParams.set("client_id", env.GITHUB_CLIENT_ID || "");
      gh.searchParams.set("redirect_uri", url.origin + "/callback");
      gh.searchParams.set("scope", url.searchParams.get("scope") || "repo");
      gh.searchParams.set("state", state);
      return new Response(null, {
        status: 302,
        headers: {
          Location: gh.toString(),
          "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
        }
      });
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const cookie = (request.headers.get("Cookie") || "").match(/(?:^|;\s*)oauth_state=([^;]+)/);
      let status = "error", content = { error: "Вход не удался. Закрой окно и попробуй ещё раз." };
      if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        content = { error: "В Cloudflare не заданы GITHUB_CLIENT_ID и GITHUB_CLIENT_SECRET." };
      } else if (code && cookie && cookie[1] === state) {
        const r = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "htr-mods-cms" },
          body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: url.origin + "/callback" })
        });
        const data = await r.json().catch(() => ({}));
        if (data.access_token) { status = "success"; content = { token: data.access_token, provider: "github" }; }
        else content = { error: data.error_description || data.error || "GitHub не выдал токен." };
      }
      const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
      const html = `<!doctype html><meta charset="utf-8"><title>Вход</title><body style="font-family:system-ui;background:#13151a;color:#eceef2;display:grid;place-items:center;height:100vh;margin:0"><p>${status === "success" ? "Готово, окно закроется само…" : "Ошибка входа. Закрой окно."}</p>
<script>
(function(){
  var origin = ${JSON.stringify(url.origin)};
  function receive(e){
    if (e.origin !== origin) return;
    window.opener.postMessage(${msg}, origin);
    window.removeEventListener("message", receive);
    ${status === "success" ? "setTimeout(function(){window.close()},300);" : ""}
  }
  window.addEventListener("message", receive, false);
  if (window.opener) window.opener.postMessage("authorizing:github", origin);
})();
</script>`;
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Set-Cookie": "oauth_state=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
