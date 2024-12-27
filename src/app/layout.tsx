import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import Script from "next/script";

const font = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
});

export const metadata: Metadata = {
  title: "Catflix - The streaming platform for your feline friend!",
  description: "Catflix provides different long-form videos for your cat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={font.variable}>
      <head />
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Provider defaultTheme="macchiato" enableSystem={false}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
      {process.env.NODE_ENV === "production" && (
        <Script
          defer
          src="https://analytics.lumi-tools.com/script.js"
          data-website-id="bb08c68e-5c59-4f4b-84eb-adc6f7a44967"
          strategy="afterInteractive"
        />
      )}
    </html>
  );
}
