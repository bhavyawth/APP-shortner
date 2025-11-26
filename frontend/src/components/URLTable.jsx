import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyURLs, getQRCode } from "../api";

export default function URLTable() {
  const [rows, setRows] = useState([]);
  const [qrImage, setQrImage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const data = await getMyURLs("test_user_123");
    setRows(data || []);
  }

  const tableWrap = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))",
    borderRadius: 12,
    padding: 10,
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)"
  };

  const thStyle = { textAlign: "left", padding: "10px 12px", color: "#bfe9ff", fontSize: 13 };
  const tdStyle = { padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.02)" };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={tableWrap}>
      <h3 style={{ marginTop: 6, marginBottom: 8 }}>Your Links</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Short</th>
            <th style={thStyle}>Destination</th>
            <th style={thStyle}>Clicks</th>
            <th style={thStyle}>Copy</th>
            <th style={thStyle}>QR</th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {rows.length === 0 && (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td colSpan="5" style={{ padding: 20, textAlign: "center", color: "#aee8ff" }}>
                  No URLs yet — shorten one on the home page!
                </td>
              </motion.tr>
            )}

            {rows.map((item, i) => (
              <motion.tr
                key={item.code}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                style={{ color: "#dbf7ff" }}
              >
                <td style={tdStyle}>
                  <a href={`http://localhost:5000/${item.code}`} target="_blank" rel="noreferrer" style={{ color: "#c7f1ff" }}>
                    {item.code}
                  </a>
                </td>

                <td style={tdStyle}>
                  <div style={{ maxWidth: 520, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.long_url}
                  </div>
                </td>

                <td style={tdStyle}>{item.clicks ?? 0}</td>

                <td style={tdStyle}>
                  <motion.button
                    onClick={() => {
                      const fullURL = `http://localhost:5000/${item.code}`;
                      navigator.clipboard.writeText(fullURL);
                      setCopiedCode(item.code);
                      setTimeout(() => setCopiedCode(null), 1300);
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      background: copiedCode === item.code ? "#10b981" : "linear-gradient(135deg, #00c6ff, #0072ff)",
                      color: "#051523",
                      fontWeight: 700
                    }}
                  >
                    {copiedCode === item.code ? "Copied ✓" : "Copy"}
                  </motion.button>
                </td>

                <td style={tdStyle}>
                  <motion.button
                    onClick={async () => {
                      const res = await getQRCode(item.code);
                      setQrImage("data:image/png;base64," + res.qr);
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                      color: "#051523",
                      fontWeight: 700
                    }}
                  >
                    QR
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {qrImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.55)",
            zIndex: 60
          }}
          onClick={() => setQrImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              borderRadius: 12,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.06)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={qrImage} alt="qr" width={220} height={220} style={{ display: "block" }} />
            <a
              href={qrImage}
              download="qrcode.png"
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "8px 12px",
                borderRadius: 8,
                background: "linear-gradient(90deg,#10b981,#34d399)",
                color: "#021217",
                fontWeight: 800,
                textDecoration: "none"
              }}
            >
              Download QR
            </a>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
