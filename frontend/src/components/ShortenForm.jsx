import { useState } from "react";
import { shortenURL } from "../api";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await shortenURL(url, "test_user_123");
    console.log(res)
    setResult(res.short_url);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter long URL"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            background: "#3b82f6",
            color: "white",
            cursor: "pointer"
          }}
        >
          Shorten URL
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Short URL:</p>
          <a href={result} target="_blank">{result}</a>
        </div>
      )}
    </div>
  );
}
