// components/Layout.js
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1100, margin: "22px auto", padding: "0 16px" }}>
        {children}
      </main>
    </>
  );
}
