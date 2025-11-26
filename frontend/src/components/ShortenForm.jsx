import { useState } from "react";
import { shortenURL } from "../api";

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [customCode, setCustomCode] = useState("");
    const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await shortenURL(url, "test_user_123", customCode);
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
        <input
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        placeholder="Enter custom code (optional)"
        style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
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
  <div
    style={{
      marginTop: "30px",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}
  >
    <p>Your short URL:</p>

    <a href={result} target="_blank" rel="noreferrer">
      {result}
    </a>

    <button
      onClick={() => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      style={{
        padding: "8px 12px",
        marginLeft: "10px",
        background: copied ? "#10b981" : "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.25s",
      }}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  </div>
)}

    </div>
  );
}
