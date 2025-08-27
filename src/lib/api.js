export async function callGeminiAPI(prompt, isJsonOutput = false) {
const res = await fetch('/api/gemini', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ prompt, isJsonOutput })
})
if (!res.ok) throw new Error(await res.text())
const data = await res.json()
return data.text || '' // when isJsonOutput=true this will be a JSON string
}
