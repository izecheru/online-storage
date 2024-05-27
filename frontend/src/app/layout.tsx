import type { Metadata } from "next";
import { Inter , Roboto_Condensed, Montserrat, Poppins} from "next/font/google";
import "./globals.scss";
import ReduxProvider from "@/components/ReduxStoreProvider";



const poppins = Poppins({subsets:["latin"],weight:["100","200","300","400","500","600","700","800","900",], variable:"--font-poppins"});
const montserrat = Montserrat({subsets:["latin"],weight:["100","200","300","400","500","600","700","800","900",], variable:"--font-montserrat"});
const roboto = Roboto_Condensed({subsets:["latin"],weight:["100","200","300","400","500","600","700","800","900",], variable:"--font-roboto"});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File-Storage Service",
  description: "Ionut zecheru made this",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className={`${inter.className} ${poppins.variable} ${montserrat.variable} ${roboto.variable}`}>
              <ReduxProvider>
              {children}
              </ReduxProvider>
            </body>
    </html>
  );
}
