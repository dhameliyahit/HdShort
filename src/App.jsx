import { useState } from "react";

function App() {
  const [short, setShort] = useState(null);
  const [url, setURL] = useState("");
  const [copied, setCopied] = useState(false);

  async function ShortURL() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/shortner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalURL: url,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setShort(result);
        setCopied(false); // Reset copied state
      } else {
        console.error("Error:", result.message);
      }
    } catch (e) {
      console.error("Error while shortening URL:", e);
    }
  }

  function copyToClipboard() {
    if (short) {
      navigator.clipboard.writeText(`${short.backEndURL}/${short.shortURL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-white text-xl font-bold text-center mb-4">
          Shorten Your URL
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            onChange={(e) => setURL(e.target.value)}
            placeholder="Enter long URL..."
            className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={ShortURL}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Shorten
          </button>
        </div>

        {short && (
          <div className="mt-4 flex items-center justify-between bg-gray-700 px-4 py-3 rounded-lg">
            <span className="text-white truncate">
              {`${short.backEndURL}/${short.shortURL}`}
            </span>
            <button
              onClick={copyToClipboard}
              className="ml-3 text-blue-400 hover:text-blue-300 transition"
            >
              📋
            </button>
          </div>
        )}

        {copied && (
          <p className="text-green-400 mt-2 text-center">Copied to clipboard!</p>
        )}
      </div>
    </div>
  );
}

export default App;
