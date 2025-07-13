import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import ClerkButtons from "@/components/ClerkButtons";
import PostHogWrapper from "@/lib/posthog/posthogWrapper";
import { PostHogIdentify } from "@/lib/posthog/posthogIdentify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Waivify – Digital Waivers Made Simple",
  description:
    "Ditch the paper. Waivify lets you create, share, and store legally binding digital waivers in econds — perfect for tattoo shops, pet groomers, yoga studios, and small businesses that need simple, secure signatures.",
  keywords: [
    "digital waivers",
    "consent forms",
    "digital signatures",
    "electronic forms",
    "mobile waivers",
    "waiver app",
    "e-signatures",
    "digital release forms",
    "online waiver platform",
    "e-sign waiver",
    "waiver software for small business",
  ],
  openGraph: {
    title: "Waivify – Digital Waivers Made Simple",
    description:
      "Ditch the paper. Waivify lets you create, share, and store legally binding digital waivers in econds — perfect for tattoo shops, pet groomers, yoga studios, and small businesses that need simple, secure signatures.",
    url: "https://www.waivify.com",
    siteName: "Waivify",
    images: [
      {
        url: "https://www.waivify.com/OG-Rectangle.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waivify – Digital Waivers Made Simple",
    description:
      "Ditch the paper. Waivify lets you create, share, and store legally binding digital waivers in econds — perfect for tattoo shops, pet groomers, yoga studios, and small businesses that need simple, secure signatures.",
    images: ["https://www.waivify.com/OG-Square.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <PostHogWrapper>
        <PostHogIdentify />
        <html lang='en'>
          <body className={inter.className}>
            <ClerkButtons />
            {children}
          </body>
        </html>
      </PostHogWrapper>
    </AuthProvider>
  );
}
