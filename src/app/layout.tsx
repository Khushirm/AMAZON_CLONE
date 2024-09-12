// import { SessionProvider } from "next-auth/react";
import ReduxProvider from "../../Redux/providers";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextAuthProvider from "@/components/NextAuthProvider";
import "./globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider session={session}> */}
        <NextAuthProvider>
          <ReduxProvider>
            <Navbar />
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
          </NextAuthProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
