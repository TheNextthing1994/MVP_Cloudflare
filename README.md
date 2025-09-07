# MVP Cloudflare – Digital Twin Reminder

Dies ist ein Minimal-Setup für ein persönliches Gedanken- und Reminder-System.  
Es läuft **komplett kostenlos** auf **Cloudflare Pages + Functions + D1 DB**.

---

## 🚀 Quickstart

1. **Repo in Cloudflare Pages verbinden**  
   - Cloudflare Dashboard → *Workers & Pages* → Create Application → Pages  
   - Repo wählen → Deploy starten  
   - Build command: leer  
   - Output directory: `public`

2. **D1 Datenbank anlegen**  
   - Cloudflare Dashboard → Storage & Databases → D1 → Create database  
   - Name: `dt_db`

3. **Binding setzen**  
   - Pages → Settings → Functions → Add binding  
   - Type: D1  
   - Name: `DB`  
   - Database: `dt_db`

4. **Schema ausführen**  
   - Cloudflare Dashboard → Storage & Databases → D1 → Query  
   - Inhalt von `/schema.sql` einfügen → Run

5. **Fertig!**  
   - Deine Seite `https://<project>.pages.dev` zeigt jetzt ein Formular, in dem du Einträge speichern kannst.  
   - Die Einträge erscheinen sofort in der Liste und können nach „heute/gestern“ gefiltert werden.

---

## ✨ Features
- Gedanken eintragen (Titel, Notizen, Tags)  
- Anzeige nach heute / gestern / alle  
- API für GPT-Integration (`/api/tasks`)  
- Optional: Daily Check-in via Cron Worker  

---

## 🧠 Optional: GPT Action
- `tasks.js` Endpoint erlaubt GPT-Action Integration  
- Auth via Bearer (`GPT_SECRET`)  
- OpenAPI Spec (`openapi.yaml`) verfügbar für direkten Import in Custom GPT

