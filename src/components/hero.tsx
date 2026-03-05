 import Image from "next/image";
 
 export function Hero() {
   return (
     <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0C0A08]">
       <Image
         src="/images/mama.JPG"
         alt="Mama Agnes Okene"
         fill
         className="object-cover opacity-30"
         priority
       />
       <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/40 to-transparent" />
 
       <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
         <p className="animate-fade-in text-[11px] uppercase tracking-[0.4em] text-gold-light">
           In Loving Memory
         </p>
 
         <h1 className="animate-fade-in-up mt-6 font-[family-name:var(--font-serif)] text-6xl font-light text-white md:text-8xl lg:text-9xl">
           Mama Agnes
         </h1>
         <h2 className="animate-fade-in-up-delay font-[family-name:var(--font-serif)] text-3xl font-light tracking-[0.15em] text-white/70 md:text-4xl">
           Okene
         </h2>
 
         <div className="animate-fade-in-up-delay mx-auto mt-8 flex items-center justify-center gap-4">
           <div className="h-px w-12 bg-gold/50" />
           <p className="text-sm tracking-[0.3em] text-white/50">
             1939 &mdash; 2026
           </p>
           <div className="h-px w-12 bg-gold/50" />
         </div>
 
         <p className="animate-fade-in-up-delay-2 mt-8 max-w-lg mx-auto font-[family-name:var(--font-serif)] text-xl italic leading-relaxed text-white/50 md:text-2xl">
           &ldquo;A life beautifully lived, a heart deeply loved, a legacy that
           will endure forever.&rdquo;
         </p>
       </div>
 
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up-delay-2">
         <div className="flex flex-col items-center gap-2 text-white/30">
           <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
           <div className="h-8 w-px bg-white/20" />
         </div>
       </div>
     </section>
   );
 }
