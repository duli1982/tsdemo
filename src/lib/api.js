// Frontend API client for accessing the Gemini serverless proxy.
export async function fetchGeminiData() {
  try {
    const response = await fetch("/api/gemini");
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}