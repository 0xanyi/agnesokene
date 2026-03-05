 import Image from "next/image";
 
 export function Biography() {
   return (
     <section className="py-24 md:py-32">
       <div className="mx-auto max-w-6xl px-6">
         <div className="text-center">
           <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
             Her Story
           </p>
           <h2 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-light md:text-5xl">
             A Life of Grace
           </h2>
           <div className="mx-auto mt-6 h-px w-16 bg-border" />
         </div>
 
         <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-20">
           <div className="relative mx-auto w-full max-w-sm">
             <div className="absolute -inset-4 rounded-2xl border border-gold/20" />
             <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
               <Image
                 src="/images/offical-photo.JPG"
                 alt="Mama Agnes Okene portrait"
                 fill
                 className="object-cover"
               />
             </div>
           </div>
 
           <div className="space-y-6">
             <p className="font-[family-name:var(--font-serif)] text-2xl font-light leading-relaxed text-foreground md:text-3xl">
               Mama Agnes Okene was a woman of remarkable grace, unwavering
               faith, and boundless love.
             </p>
             <div className="h-px w-12 bg-gold/40" />
             <p className="text-warm-gray leading-[1.8]">
               Born in 1939, she grew up with a deep sense of community and an
               unshakeable commitment to family. Throughout her life, Mama Agnes
               touched the hearts of everyone she met.
             </p>
             <p className="text-warm-gray leading-[1.8]">
               She was known for her warm smile, her generous spirit, and her
               ability to make every person feel valued and loved. A devoted
               mother, grandmother, great-grandmother, and friend, Mama Agnes
               leaves behind a legacy of kindness, resilience, and faith.
             </p>
             <p className="text-warm-gray-light italic leading-[1.8]">
               Her memory lives on in the countless lives she touched and the
               love she so freely shared.
             </p>
           </div>
         </div>
       </div>
     </section>
   );
 }
