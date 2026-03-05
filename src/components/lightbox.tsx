 "use client";
 
 import { useEffect, useCallback } from "react";
 import Image from "next/image";
 
 interface LightboxProps {
   images: { id: string; url: string; caption: string | null }[];
   currentIndex: number;
   onClose: () => void;
   onNavigate: (index: number) => void;
 }
 
 export function Lightbox({
   images,
   currentIndex,
   onClose,
   onNavigate,
 }: LightboxProps) {
   const image = images[currentIndex];
 
   const handleKeyDown = useCallback(
     (e: KeyboardEvent) => {
       if (e.key === "Escape") onClose();
       if (e.key === "ArrowLeft" && currentIndex > 0)
         onNavigate(currentIndex - 1);
       if (e.key === "ArrowRight" && currentIndex < images.length - 1)
         onNavigate(currentIndex + 1);
     },
     [currentIndex, images.length, onClose, onNavigate]
   );
 
   useEffect(() => {
     document.addEventListener("keydown", handleKeyDown);
     document.body.style.overflow = "hidden";
     return () => {
       document.removeEventListener("keydown", handleKeyDown);
       document.body.style.overflow = "";
     };
   }, [handleKeyDown]);
 
   return (
     <div
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
       onClick={onClose}
     >
       <button
         onClick={onClose}
         className="absolute right-4 top-4 text-3xl text-white/70 hover:text-white"
         aria-label="Close"
       >
         &times;
       </button>
 
       {currentIndex > 0 && (
         <button
           onClick={(e) => {
             e.stopPropagation();
             onNavigate(currentIndex - 1);
           }}
           className="absolute left-4 text-4xl text-white/70 hover:text-white"
           aria-label="Previous"
         >
           &#8249;
         </button>
       )}
 
       <div
         className="relative max-h-[85vh] max-w-[90vw]"
         onClick={(e) => e.stopPropagation()}
       >
         <Image
           src={image.url}
           alt={image.caption || "Gallery photo"}
           width={1200}
           height={800}
           className="max-h-[85vh] w-auto object-contain"
         />
         {image.caption && (
           <p className="mt-3 text-center text-sm text-white/70">
             {image.caption}
           </p>
         )}
       </div>
 
       {currentIndex < images.length - 1 && (
         <button
           onClick={(e) => {
             e.stopPropagation();
             onNavigate(currentIndex + 1);
           }}
           className="absolute right-4 text-4xl text-white/70 hover:text-white"
           aria-label="Next"
         >
           &#8250;
         </button>
       )}
 
       <div className="absolute bottom-4 text-sm text-white/50">
         {currentIndex + 1} / {images.length}
       </div>
     </div>
   );
 }
