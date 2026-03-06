import "@/styles/globals.css";
import { Prata, IBM_Plex_Sans } from "next/font/google";

const fontDisplay = Prata({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap"
});

const fontText = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${fontDisplay.variable} ${fontText.variable}`}>
        {children}
        <div className="grain" />
      </body>
    </html>
  );
}