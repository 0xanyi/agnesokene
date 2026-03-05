 import Image from "next/image";
 
 export function Hero() {
   return (
     <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-foreground">
       <Image
         src="/images/hero.jpg"
         alt="Mama Agnes Okene"
         fill
         className="object-cover opacity-40"
         priority
       />
       <div className="relative z-10 mx-auto max-w-3xl px-6 text-center animate-fade-in">
         <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold-light">
           In Loving Memory
         </p>
         <h1 className="font-[family-name:var(--font-serif)] text-5xl font-bold text-white md:text-7xl">
           Mama Agnes Okene
         </h1>
         <div className="mx-auto mt-6 h-px w-24 bg-gold" />
         <p className="mt-6 text-lg text-white/80 md:text-xl">
           1940 &mdash; 2025
         </p>
         <p className="mt-4 max-w-xl mx-auto font-[family-name:var(--font-serif)] text-lg italic text-white/70">
           &ldquo;A life beautifully lived, a heart deeply loved, a legacy that
           will endure forever.&rdquo;
         </p>
       </div>
     </section>
   );
 }
