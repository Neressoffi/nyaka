import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-alternate",
});

export const metadata: Metadata = {
  title: "NYAKA | Branding, design, vidéo, intelligence artificielle et données",
  description:
    "NYAKA accompagne les organisations dans la création et l'évolution de leur marque grâce au branding, au design, à la vidéo, à l'intelligence artificielle et aux données.",
  openGraph: {
    title: "NYAKA - Donnons une direction claire à votre projet",
    description:
      "Branding, design, contenus vidéo, intelligence artificielle et données : NYAKA construit des solutions cohérentes autour de votre besoin réel.",
    type: "website",
    locale: "fr_FR",
    siteName: "NYAKA",
  },
  twitter: {
    card: "summary_large_image",
    title: "NYAKA - Donnons une direction claire à votre projet",
    description:
      "Branding, design, contenus vidéo, intelligence artificielle et données : NYAKA construit des solutions cohérentes autour de votre besoin réel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" forcedTheme="dark">
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
