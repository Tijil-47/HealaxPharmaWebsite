import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, paddingTop: "80px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
