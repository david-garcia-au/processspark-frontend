import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "ProcessSpark — Less manual work. More possibility.",
  description:
    "Practical AI for manufacturing, logistics and industrial services. Turn repetitive inspection, paperwork and reporting into better processes. Show us your process.",
  openGraph: {
    title:
      "ProcessSpark — AI for the work your people shouldn’t be doing manually.",
    description:
      "Start with one process. Build a practical solution. Measure what changes.",
    type: "website",
    siteName: "ProcessSpark",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
