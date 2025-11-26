import { useState, useEffect } from "react";
import Popup from "./components/Popup.jsx";
import Stars from "./components/Stars.jsx";
import { motion } from "framer-motion";

export default function App() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const backend = "http://127.0.0.1:5000";

  // Generate user_token
  useEffect(() => {
    let token = localStorage.getItem("user_token");
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem("user_token", token);
    }
  }, []);

  // ---------------------------------
  // Shorten URL
  // ---------------------------------
  const shortenURL = async () => {
    if (!url) return;

    const res = await fetch(`${backend}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        user_token: localStorage.getItem("user_token"),
      }),
    });

    const data = await res.json();
    setShortUrl(data.short_url);
  };

  // ---------------------------------
  // Show user's urls
  // ---------------------------------
  const openMyUrls = async () => {
    const res = await fetch(`${backend}/my-urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_token: localStorage.getItem("user_token"),
      }),
    });

    const urls = await res.json();

    setPopupContent(
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Your URLs</h2>

        {urls.length === 0 && <p className="text-gray-500">No URLs yet.</p>}

        <div className="space-y-2">
          {urls.map((u, i) => (
            <motion.div
              key={i}
              className="p-4 bg-gray-100 rounded-lg border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p><strong>{u.code}</strong> → {u.long_url}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );

    setPopupOpen(true);
  };

  // ---------------------------------
  // Show stats
  // ---------------------------------
  const openMyStats = async () => {
    const res = await fetch(`${backend}/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_token: localStorage.getItem("user_token"),
      }),
    });

    const stats = await res.json();

    setPopupContent(
      <div>
        <h2 className="text-2xl font-bold mb-3">Your Stats</h2>
        <pre className="bg-gray-100 p-3 rounded-lg">
          {JSON.stringify(stats, null, 2)}
        </pre>
      </div>
    );

    setPopupOpen(true);
  };

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-white to-gray-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Stars />
      {/* TITLE */}
      <motion.h1
        className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        URL Shortener
      </motion.h1>

      {/* INPUT + BUTTON */}
      <motion.div
        className="flex gap-3"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <input
          type="text"
          placeholder="Enter long URL"
          className="px-4 py-3 w-96 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={shortenURL}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95"
        >
          Shorten
        </button>
      </motion.div>

      {/* SHOW SHORT URL */}
      {shortUrl && (
        <motion.p
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Your Short URL:
          <a className="text-blue-600 underline ml-2" href={shortUrl}>
            {shortUrl}
          </a>
        </motion.p>
      )}

      {/* BUTTONS */}
      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button 
          onClick={openMyUrls}
          className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black active:scale-95"
        >
          Show My URLs
        </button>

        <button 
          onClick={openMyStats}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 active:scale-95"
        >
          Show My Stats
        </button>
      </motion.div>

      {/* POPUP */}
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
        {popupContent}
      </Popup>

    </motion.div>
  );
}
