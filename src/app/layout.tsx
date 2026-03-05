 import type { Metadata } from "next";
 import { Inter, Playfair_Display } from "next/font/google";
 import { Navbar } from "@/components/navbar";
 import "./globals.css";
 
 const inter = Inter({
   variable: "--font-geist-sans",
   subsets: ["latin"],
 });
 
 const playfair = Playfair_Display({
   variable: "--font-serif",
   subsets: ["latin"],
 });
 
 export const metadata: Metadata = {
   title: "In Loving Memory of Mama Agnes Okene",
   description:
     "A tribute to the beautiful life of Mama Agnes Okene. Share your memories, view photos, and celebrate her legacy.",
   openGraph: {
     title: "In Loving Memory of Mama Agnes Okene",
     description:
       "A tribute to the beautiful life of Mama Agnes Okene. Share your memories and celebrate her legacy.",
     type: "website",
   },
 };
 
 export default function RootLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
     <html lang="en">
       <body className={`${inter.variable} ${playfair.variable} antialiased`}>
         <Navbar />
         <main>{children}</main>
         <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
           <p>In Loving Memory of Mama Agnes Okene</p>
         </footer>
       </body>
     </html>
   );
 }
