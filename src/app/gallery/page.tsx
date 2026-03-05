 import { GalleryGrid } from "@/components/gallery-grid";
 
 export const metadata = {
   title: "Gallery | In Loving Memory of Mama Agnes Okene",
   description: "Photo gallery celebrating the life of Mama Agnes Okene.",
 };
 
 export default function GalleryPage() {
   return (
     <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
       <div className="text-center">
         <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
           Cherished Moments
         </p>
         <h1 className="mt-3 font-[family-name:var(--font-serif)] text-5xl font-light md:text-6xl">
           Photo Gallery
         </h1>
         <div className="mx-auto mt-6 h-px w-16 bg-border" />
         <p className="mt-6 text-warm-gray">
           A collection of treasured memories from Mama Agnes&apos;s life.
         </p>
       </div>
       <div className="mt-16">
         <GalleryGrid />
       </div>
     </div>
   );
 }
