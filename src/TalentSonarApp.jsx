import React, { useEffect, useState } from "react";
import { fetchGeminiData } from "./lib/api";

const TalentSonarApp = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchGeminiData();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }
    loadData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TalentSonar</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!data && !error && <p>Loading...</p>}
      {data && (
        <div>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TalentSonarApp;