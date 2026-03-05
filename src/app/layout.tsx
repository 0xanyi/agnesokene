 import type { Metadata } from "next";
 import { Montserrat, Cormorant } from "next/font/google";
 import { Navbar } from "@/components/navbar";
 import "./globals.css";
 
 const montserrat = Montserrat({
   variable: "--font-geist-sans",
   subsets: ["latin"],
 });
 
 const cormorant = Cormorant({
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
       <body className={`${montserrat.variable} ${cormorant.variable} antialiased font-[family-name:var(--font-geist-sans)]`}>
         <Navbar />
         <main>{children}</main>
         <footer className="border-t border-border/50 bg-foreground py-16 text-center text-primary-foreground">
           <p className="font-[family-name:var(--font-serif)] text-2xl font-light italic tracking-wide">
             &ldquo;To live in the hearts of those we leave behind is not to die.&rdquo;
           </p>
           <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
           <p className="mt-6 text-sm tracking-widest uppercase opacity-60">
             In Loving Memory of Mama Agnes Okene
           </p>
           <p className="mt-1 text-xs opacity-40">
             1939 &mdash; 2026
           </p>
         </footer>
       </body>
     </html>
   );
 }
