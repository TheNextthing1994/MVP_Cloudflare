// Cloudflare Pages Function: /api/entries
// GET  /api/entries                -> letzte 50
// GET  /api/entries?today=true     -> nur heute (UTC Datum)
// GET  /api/entries?yesterday=true -> nur gestern
// POST /api/entries                -> { title, note?, tags?:string[], user_id? }

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const today = url.searchParams.get("today");
  const yesterday = url.searchParams.get("yesterday");

  if (today === "true") {
    const iso = new Date().toISOString().slice(0, 10);
    const { results } = await env.DB
      .prepare("SELECT * FROM entries WHERE substr(created_at,1,10)=? ORDER BY id DESC LIMIT 50")
      .bind(iso).all();
    return json(results);
  }

  if (yesterday === "true") {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const iso = d.toISOString().slice(0, 10);
    const { results } = await env.DB
      .prepare("SELECT * FROM entries WHERE substr(created_at,1,10)=? ORDER BY id DESC LIMIT 50")
      .bind(iso).all();
    return json(results);
  }

  const { results } = await env.DB
    .prepare("SELECT * FROM entries ORDER BY id DESC LIMIT 50")
    .all();
  return json(results);
}

export async function onRequestPost({ request, env }) {
  const { title, note, tags, user_id } = await request.json();
  if (!title) return new Response("title required", { status: 400 });

  const res = await env.DB
    .prepare("INSERT INTO entries (user_id, title, note, tags) VALUES (?, ?, ?, ?)")
    .bind(user_id ?? "anon", title, note ?? "", (tags ?? []).join(","))
    .run();

  return json({ ok: true, id: res.lastRowId });
}

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" }
  });
}
