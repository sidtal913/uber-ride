export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: 640 }}>
      <h1>Uber Ride API</h1>
      <p>
        Backend is running. Customer UI ships on a separate hire ticket. Try{" "}
        <code>GET /api/health</code> — protected routes require{" "}
        <code>Authorization: Bearer &lt;JWT&gt;</code> (see <code>spec/auth.yaml</code>).
      </p>
    </main>
  );
}
