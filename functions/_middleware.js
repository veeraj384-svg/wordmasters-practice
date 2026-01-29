export async function onRequest(context) {
  const url = new URL(context.request.url);

  // protect only teacher area
  if (!url.pathname.startsWith("/teacher/")) return context.next();

  const user = context.env.BASIC_USER || "";
  const pass = context.env.BASIC_PASS || "";
  if (!user || !pass) {
    return new Response("Teacher area not configured (missing BASIC_USER/BASIC_PASS).", { status: 401 });
  }

  // IMPORTANT: realm includes a version so we can "log out" by bumping it
  // Change REALM_VERSION to force everyone to re-login.
  const realmVersion = context.env.REALM_VERSION || "1";
  const realm = `Basic realm="Teacher Area v${realmVersion}"`;

  const auth = context.request.headers.get("Authorization") || "";
  if (!auth.startsWith("Basic ")) {
    return new Response("Authentication required", { status: 401, headers: { "WWW-Authenticate": realm } });
  }

  try {
    const decoded = atob(auth.slice(6));
    const [u, p] = decoded.split(":");
    if (u === user && p === pass) return context.next();
  } catch (e) {}

  return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": realm } });
}

