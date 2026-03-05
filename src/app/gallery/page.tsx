 import { Separator } from "@/components/ui/separator";
 import { GalleryGrid } from "@/components/gallery-grid";
 
 export const metadata = {
   title: "Gallery | In Loving Memory of Agnes Okene",
   description: "Photo gallery celebrating the life of Agnes Okene.",
 };
 
 export default function GalleryPage() {
   return (
     <div className="mx-auto max-w-6xl px-6 py-16">
       <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold text-center md:text-5xl">
         Photo Gallery
       </h1>
       <Separator className="mx-auto mt-4 w-16 bg-gold" />
       <p className="mt-4 text-center text-muted-foreground">
         Cherished moments from Agnes&apos;s life.
       </p>
       <div className="mt-12">
         <GalleryGrid />
       </div>
     </div>
   );
 }
