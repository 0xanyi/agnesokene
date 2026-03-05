 import Image from "next/image";
 import { Separator } from "@/components/ui/separator";
 
 export function Biography() {
   return (
     <section className="mx-auto max-w-3xl px-6 py-20">
       <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-center md:text-4xl">
         Her Story
       </h2>
       <Separator className="mx-auto mt-4 w-16 bg-gold" />
 
       <div className="mt-12 grid gap-10 md:grid-cols-[280px_1fr]">
         <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
           <Image
             src="/images/mama.JPG"
             alt="Mama Agnes Okene portrait"
             fill
             className="object-cover"
           />
         </div>
         <div className="space-y-4 text-warm-gray leading-relaxed">
           <p>
             Mama Agnes Okene was a woman of remarkable grace, unwavering faith, and
             boundless love. Born in 1939, she grew up with a deep sense of
             community and an unshakeable commitment to family.
           </p>
           <p>
             Throughout her life, Mama Agnes touched the hearts of everyone she met.
             She was known for her warm smile, her generous spirit, and her
             ability to make every person feel valued and loved.
           </p>
           <p>
             A devoted mother, grandmother, and friend, Mama Agnes leaves behind a
             legacy of kindness, resilience, and faith. Her memory lives on in
             the countless lives she touched and the love she so freely shared.
           </p>
           <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg">
             <Image
               src="/images/young-mama2.JPG"
               alt="Young Mama Agnes Okene"
               fill
               className="object-cover"
             />
           </div>
         </div>
       </div>
     </section>
   );
 }
