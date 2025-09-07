// POST /api/tasks  (für GPT Actions)
// Auth: Authorization: Bearer <GPT_SECRET>

export async function onRequestPost({ request, env }) {
  const auth = request.headers.get("authorization") || "";
  const expected = `Bearer ${env.GPT_SECRET || ""}`;
  if (!env.GPT_SECRET || auth !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, note, when, tags, user_id } = await request.json();
  if (!title) return new Response("title required", { status: 400 });

  const whenIso = when ? new Date(when).toISOString() : null;

  const sql = `
    INSERT INTO entries (user_id, title, note, tags, created_at)
    VALUES (?, ?, ?, ?, COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ','now')))
  `;
  const res = await env.DB
    .prepare(sql)
    .bind(user_id ?? "gpt", title, note ?? "", (tags ?? []).join(","), whenIso)
    .run();

  return new Response(JSON.stringify({ ok: true, id: res.lastRowId }), {
    headers: { "content-type": "application/json" }
  });
}
