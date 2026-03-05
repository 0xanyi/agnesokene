import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-72px)] items-center justify-center overflow-hidden bg-[#0C0A08] sm:min-h-[85vh]">
      <Image
        src="/images/hero-collage.jpg"
        alt="Mama Agnes Okene - A life in photos"
        fill
        className="object-cover object-[68%_center] opacity-55 sm:object-center sm:opacity-45"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/70 via-[#0C0A08]/45 to-[#0C0A08]/20 sm:from-[#0C0A08]/85 sm:via-[#0C0A08]/50 sm:to-[#0C0A08]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A08]/55 via-[#0C0A08]/30 to-[#0C0A08]/50 sm:from-[#0C0A08]/65 sm:via-[#0C0A08]/35 sm:to-[#0C0A08]/60" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-6">
        <p className="animate-fade-in text-[10px] uppercase tracking-[0.32em] text-gold-light sm:text-[11px] sm:tracking-[0.4em]">
          In Loving Memory
        </p>

        <h1 className="animate-fade-in-up mt-6 font-[family-name:var(--font-serif)] text-6xl font-light leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-7xl md:text-8xl lg:text-9xl">
          Mama Agnes
        </h1>
        <h2 className="animate-fade-in-up-delay mt-1 font-[family-name:var(--font-serif)] text-4xl font-light tracking-[0.14em] text-white/80 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl">
          Okene
        </h2>

        <div className="animate-fade-in-up-delay mx-auto mt-8 flex items-center justify-center gap-3 sm:gap-4">
          <div className="h-px w-9 bg-gold/50 sm:w-12" />
          <p className="text-xs tracking-[0.22em] text-white/55 sm:text-sm sm:tracking-[0.3em]">
            1939 &mdash; 2026
          </p>
          <div className="h-px w-9 bg-gold/50 sm:w-12" />
        </div>

        <p className="animate-fade-in-up-delay-2 mx-auto mt-8 max-w-lg font-[family-name:var(--font-serif)] text-xl italic leading-relaxed text-white/70 sm:text-2xl sm:text-white/55 md:text-2xl">
          &ldquo;A life beautifully lived, a heart deeply loved, a legacy that
          will endure forever.&rdquo;
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-fade-in-up-delay-2 sm:block">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-white/20" />
        </div>
      </div>
    </section>
  );
}
