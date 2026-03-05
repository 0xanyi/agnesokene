 import Image from "next/image";
 
 interface TributeCardProps {
   name: string;
   relationship?: string | null;
   message: string;
   photoUrl?: string | null;
   createdAt: string;
 }
 
 export function TributeCard({
   name,
   relationship,
   message,
   photoUrl,
   createdAt,
 }: TributeCardProps) {
   const date = new Date(createdAt).toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
   });
 
   return (
     <article className="group relative border-b border-border/40 pb-8 last:border-b-0">
       <div className="flex items-baseline justify-between gap-4">
         <div>
           <h3 className="font-[family-name:var(--font-serif)] text-lg font-medium text-foreground">
             {name}
           </h3>
           {relationship && (
             <span className="text-[11px] uppercase tracking-[0.15em] text-gold">
               {relationship}
             </span>
           )}
         </div>
         <time className="shrink-0 text-[11px] tracking-wide text-warm-gray-light">
           {date}
         </time>
       </div>
 
       <blockquote className="mt-4 border-l-2 border-gold/30 pl-5 font-[family-name:var(--font-serif)] text-lg leading-[1.8] text-warm-gray">
         {message}
       </blockquote>
 
       {photoUrl && (
         <div className="relative mt-5 aspect-video overflow-hidden rounded-lg">
           <Image
             src={photoUrl}
             alt={`Photo shared by ${name}`}
             fill
             className="object-cover"
           />
         </div>
       )}
     </article>
   );
 }
