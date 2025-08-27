// This serverless function acts as a proxy to the Gemini API.
// Designed for deployment on Vercel or similar platforms.
export default async (req, res) => {
  try {
    const apiUrl = process.env.VITE_API_URL;
    const apiKey = process.env.VITE_API_KEY;
    
    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ message: "Error fetching data from Gemini API" });
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};