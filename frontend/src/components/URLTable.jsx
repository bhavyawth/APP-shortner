import { useEffect, useState } from "react";
import { getMyURLs } from "../api";
import { getQRCode } from "../api";

export default function URLTable() {
  const [rows, setRows] = useState([]);
  const [qrImage, setQrImage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    getMyURLs("test_user_123").then(setRows);
  }, []);

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#e5e7eb" }}>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Short Code</th>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Long URL</th>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Clicks</th>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Scan For Magic</th>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Copy</th>
        </tr>
      </thead>

      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>
              No URLs created yet.
            </td>
          </tr>
        ) : (
          rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                <a href={`http://localhost:5000/${r.code}`} target="_blank">
                  {r.code}
                </a>
              </td>

              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {r.long_url}
              </td>

              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {r.clicks}
              </td>

              {/* QR COLUMN */}
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={async () => {
                    const res = await getQRCode(r.code);
                    setQrImage("data:image/png;base64," + res.qr);
                  }}
                  style={{
                    padding: "6px 10px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  QR
                </button>
              </td>

              {/* COPY COLUMN */}
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    const fullURL = `http://localhost:5000/${r.code}`;
                    navigator.clipboard.writeText(fullURL);
                    setCopiedCode(r.code);
                    setTimeout(() => setCopiedCode(null), 1500);
                  }}
                  style={{
                    padding: "6px 10px",
                    background: copiedCode === r.code ? "#10b981" : "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.25s",
                  }}
                >
                  {copiedCode === r.code ? "Copied ✓" : "Copy"}
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>

      {qrImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setQrImage(null)}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img src={qrImage} alt="QR Code" width="200" />

            <a
              href={qrImage}
              download="qrcode.png"
              style={{
                display: "block",
                marginTop: "15px",
                padding: "10px",
                background: "#10b981",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Download QR
            </a>
          </div>
        </div>
      )}
    </table>
  );
}
