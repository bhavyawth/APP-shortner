import ShortenForm from "../components/ShortenForm";

export default function Home() {
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h1>URL Shortener 🔗</h1>
      <p>Paste your long URL below.</p>

      <ShortenForm />
    </div>
  );
}
