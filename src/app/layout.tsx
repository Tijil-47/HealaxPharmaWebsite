import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healax Pharma | Premium Therapeutics & Biomedical Research",
  description: "Healax Pharma is a global leader in clinical innovation, R&D biotechnology, and premium patient wellness solutions.",
  keywords: ["pharmaceutical", "biotech", "clinical trials", "therapeutics", "immunology", "oncology", "Healax"],
  openGraph: {
    title: "Healax Pharma | Leading Scientific Innovation",
    description: "Developing next-generation therapeutic treatments and advanced biomedical research.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
