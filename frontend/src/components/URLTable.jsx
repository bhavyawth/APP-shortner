import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyURLs, getQRCode } from "../api";

export default function URLTable({ getUser }) {
  const [rows, setRows] = useState([]);
  const [qrImage, setQrImage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const user = getUser;
    const data = await getMyURLs(user);
    setRows(data || []);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "#fff5e6",
        border: "6px solid #2d1810",
        borderRadius: 20,
        padding: 28,
        boxShadow: "10px 10px 0px #2d1810",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 20,
          fontSize: 28,
          fontWeight: 900,
          color: "#2d1810",
          textTransform: "uppercase",
        }}
      >
        🔗 Your Links
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "14px 18px",
                  color: "#fff5e6",
                  fontSize: 14,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  background: "#ff6b6b",
                  border: "4px solid #2d1810",
                  borderRight: "none",
                  borderRadius: "12px 0 0 12px",
                }}
              >
                Short
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "14px 18px",
                  color: "#fff5e6",
                  fontSize: 14,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  background: "#ff6b6b",
                  border: "4px solid #2d1810",
                  borderRight: "none",
                  borderLeft: "none",
                }}
              >
                Destination
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "14px 18px",
                  color: "#fff5e6",
                  fontSize: 14,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  background: "#ff6b6b",
                  border: "4px solid #2d1810",
                  borderRight: "none",
                  borderLeft: "none",
                }}
              >
                Clicks
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "14px 18px",
                  color: "#fff5e6",
                  fontSize: 14,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  background: "#ff6b6b",
                  border: "4px solid #2d1810",
                  borderRight: "none",
                  borderLeft: "none",
                }}
              >
                Copy
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "14px 18px",
                  color: "#fff5e6",
                  fontSize: 14,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  background: "#ff6b6b",
                  border: "4px solid #2d1810",
                  borderLeft: "none",
                  borderRadius: "0 12px 12px 0",
                }}
              >
                QR
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: 32,
                      textAlign: "center",
                      color: "#2d1810",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    No URLs yet — create one above! 🚀
                  </td>
                </tr>
              )}

              {rows.map((item, i) => (
                <motion.tr
                  key={item.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td
                    style={{
                      padding: "16px 18px",
                      background: "white",
                      border: "4px solid #2d1810",
                      borderRight: "none",
                      borderRadius: "12px 0 0 12px",
                      fontWeight: 800,
                    }}
                  >
                    <a
                      href={`/r/${item.code}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#ff6b6b", textDecoration: "none" }}
                    >
                      {item.code}
                    </a>
                  </td>

                  <td
                    style={{
                      padding: "16px 18px",
                      background: "white",
                      border: "4px solid #2d1810",
                      borderRight: "none",
                      borderLeft: "none",
                      maxWidth: 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontWeight: 600,
                      color: "#2d1810",
                    }}
                  >
                    {item.long_url}
                  </td>

                  <td
                    style={{
                      padding: "16px 18px",
                      background: "white",
                      border: "4px solid #2d1810",
                      borderRight: "none",
                      borderLeft: "none",
                      fontWeight: 800,
                      color: "#2d1810",
                    }}
                  >
                    {item.clicks ?? 0}
                  </td>

                  <td
                    style={{
                      padding: "16px 18px",
                      background: "white",
                      border: "4px solid #2d1810",
                      borderRight: "none",
                      borderLeft: "none",
                      textAlign: "center",
                    }}
                  >
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const fullURL = `http://localhost:5000/${item.code}`;
                        navigator.clipboard.writeText(fullURL);
                        setCopiedCode(item.code);
                        setTimeout(() => setCopiedCode(null), 1500);
                      }}
                      style={{
                        padding: "8px 16px",
                        border: "3px solid #2d1810",
                        borderRadius: 8,
                        background: copiedCode === item.code ? "#95e1d3" : "#ffe66d",
                        color: "#2d1810",
                        fontWeight: 900,
                        fontSize: 13,
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {copiedCode === item.code ? "✓" : "Copy"}
                    </motion.button>
                  </td>

                  <td
                    style={{
                      padding: "16px 18px",
                      background: "white",
                      border: "4px solid #2d1810",
                      borderLeft: "none",
                      borderRadius: "0 12px 12px 0",
                      textAlign: "center",
                    }}
                  >
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        const res = await getQRCode(item.code);
                        setQrImage("data:image/png;base64," + res.qr);
                      }}
                      style={{
                        padding: "8px 16px",
                        border: "3px solid #2d1810",
                        borderRadius: 8,
                        background: "#4ecdc4",
                        color: "#2d1810",
                        fontWeight: 900,
                        fontSize: 13,
                        cursor: "pointer",
                        textTransform: "uppercase",
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
      </div>

      {/* QR Modal */}
      <AnimatePresence>
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
              background: "rgba(45, 24, 16, 0.8)",
              backdropFilter: "blur(8px)",
              zIndex: 100,
            }}
            onClick={() => setQrImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              style={{
                background: "#fff5e6",
                border: "6px solid #2d1810",
                borderRadius: 20,
                padding: 32,
                boxShadow: "12px 12px 0px #2d1810",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={qrImage}
                alt="qr"
                width={240}
                height={240}
                style={{ display: "block", border: "4px solid #2d1810", borderRadius: 12 }}
              />
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={qrImage}
                download="qrcode.png"
                style={{
                  display: "block",
                  marginTop: 20,
                  padding: "14px 24px",
                  textAlign: "center",
                  borderRadius: 12,
                  background: "#4ecdc4",
                  color: "#2d1810",
                  fontWeight: 900,
                  textDecoration: "none",
                  border: "4px solid #2d1810",
                  boxShadow: "4px 4px 0px #2d1810",
                  textTransform: "uppercase",
                }}
              >
                📥 Download QR
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
