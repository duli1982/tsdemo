export default async function handler(req, res) {
try {
const key = process.env.GEMINI_API_KEY
if (!key) return res.status(500).send('Missing GEMINI_API_KEY env var')


let body = {}
try {
body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
} catch (e) {}
if (!body.prompt) return res.status(400).send('Missing prompt')


const payload = {
contents: [{ role: 'user', parts: [{ text: body.prompt }]}],
...(body.isJsonOutput ? { generationConfig: { responseMimeType: 'application/json' } } : {})
}


const r = await fetch(
'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key,
{
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
}
)


if (!r.ok) {
const txt = await r.text()
return res.status(r.status).send(txt)
}


const j = await r.json()
const text = j?.candidates?.[0]?.content?.parts?.[0]?.text || ''
res.status(200).json({ text })
} catch (e) {
res.status(500).send(String(e))
}
}
