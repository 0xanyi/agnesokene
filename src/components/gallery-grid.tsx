 "use client";
 
 import { useEffect, useState } from "react";
 import Image from "next/image";
 import { Lightbox } from "@/components/lightbox";
 
 interface GalleryImage {
   id: string;
   url: string;
   caption: string | null;
   category: string | null;
 }
 
 export function GalleryGrid() {
   const [images, setImages] = useState<GalleryImage[]>([]);
   const [loading, setLoading] = useState(true);
   const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
 
   useEffect(() => {
     fetch("/api/gallery")
       .then((r) => r.json())
       .then((d) => setImages(d.images))
       .catch(() => {})
       .finally(() => setLoading(false));
   }, []);
 
   const categories = [...new Set(images.map((img) => img.category).filter(Boolean))] as string[];
 
   if (loading) {
     return (
       <p className="py-20 text-center text-muted-foreground">
         Loading gallery...
       </p>
     );
   }
 
   if (images.length === 0) {
     return (
       <p className="py-20 text-center text-muted-foreground">
         Gallery photos coming soon.
       </p>
     );
   }
 
   return (
     <>
       {categories.length > 0
         ? categories.map((cat) => {
             const catImages = images.filter((img) => img.category === cat);
             return (
               <div key={cat} className="mb-12">
                 <h3 className="mb-8 font-[family-name:var(--font-serif)] text-2xl font-light tracking-wide">
                   <span className="mr-3 text-gold">&mdash;</span>
                   {cat}
                 </h3>
                 <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                   {catImages.map((img) => {
                     const globalIdx = images.findIndex((i) => i.id === img.id);
                     return (
                       <button
                         key={img.id}
                         onClick={() => setLightboxIdx(globalIdx)}
                         className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                       >
                         <Image
                           src={img.url}
                           alt={img.caption || "Gallery photo"}
                           fill
                           className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                         <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                         {img.caption && (
                           <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                             {img.caption}
                           </div>
                         )}
                       </button>
                     );
                   })}
                 </div>
               </div>
             );
           })
         : (
           <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
             {images.map((img, idx) => (
               <button
                 key={img.id}
                 onClick={() => setLightboxIdx(idx)}
                 className="group relative aspect-square overflow-hidden rounded-lg"
               >
                 <Image
                   src={img.url}
                   alt={img.caption || "Gallery photo"}
                   fill
                   className="object-cover transition-transform duration-300 group-hover:scale-105"
                   sizes="(max-width: 768px) 50vw, 25vw"
                 />
               </button>
             ))}
           </div>
         )}
 
       {lightboxIdx !== null && (
         <Lightbox
           images={images}
           currentIndex={lightboxIdx}
           onClose={() => setLightboxIdx(null)}
           onNavigate={setLightboxIdx}
         />
       )}
     </>
   );
 }
