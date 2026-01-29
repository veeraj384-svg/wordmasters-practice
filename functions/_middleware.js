export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Only protect teacher area
  if (!url.pathname.startsWith("/teacher/")) {
    return context.next();
  }

  const user = context.env.BASIC_USER || "";
  const pass = context.env.BASIC_PASS || "";

  // If you forgot to set env vars, deny by default
  if (!user || !pass) {
    return new Response("Teacher area is not configured yet (missing BASIC_USER/BASIC_PASS).", { status: 401 });
  }

  const auth = context.request.headers.get("Authorization") || "";
  const realm = 'Basic realm="Teacher Area"';

  if (!auth.startsWith("Basic ")) {
    return new Response("Authentication required", { status: 401, headers: { "WWW-Authenticate": realm } });
  }

  try {
    const encoded = auth.slice(6);
    const decoded = atob(encoded);
    const [u, p] = decoded.split(":");
    if (u === user && p === pass) return context.next();
  } catch (e) {}

  return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": realm } });
}
