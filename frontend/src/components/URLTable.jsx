import { useEffect, useState } from "react";
import { getMyURLs } from "../api";

export default function URLTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getMyURLs("test_user_123").then(setRows);
  }, []);

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#e5e7eb" }}>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Short Code</th>
          <th style={{ padding: "10px", border: "1px solid #ccc" }}>Long URL</th>
        </tr>
      </thead>

      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan="2" style={{ padding: "20px", textAlign: "center" }}>
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
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
