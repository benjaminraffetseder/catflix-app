import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";

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
    </html>
  );
}
