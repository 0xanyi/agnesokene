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
            Life &amp; Legacy of Mama Agnes Okene
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-border" />
        </div>

        {/* Portrait + Opening */}
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
              Born around 1939, our beloved mother came into the world at a time
              when birth records were not always formally kept.
            </p>
            <div className="h-px w-12 bg-gold/40" />
            <p className="text-warm-gray leading-[1.8]">
              As a result, her exact date of birth was never officially recorded
              and has been lovingly estimated based on the recorded birthdates of
              her cousins. What is certain, however, is the place and heritage
              that shaped her remarkable life.
            </p>
            <p className="text-warm-gray leading-[1.8]">
              She was born in Eruemukohwarien to her father, Okerhe, who hailed
              from Ekakpamre village in Ughelli South Local Government Area of
              Delta State, and her mother, Idolor, from Okpara Inland in Ethiope
              East Local Government Area. Although her parents originally lived
              in Ekakpamre, they later relocated to Eruemukohwarien, where she
              was born.
            </p>
          </div>
        </div>

        {/* Full Biography */}
        <div className="mx-auto mt-16 max-w-3xl space-y-6">
          <p className="text-warm-gray leading-[1.8]">
            She was the youngest child of her father, Okerhe, and from the very
            beginning of her life she carried the quiet strength and resilience
            that would come to define her journey.
          </p>
          <p className="text-warm-gray leading-[1.8]">
            Her siblings, in order of seniority, were:
          </p>
          <ul className="space-y-1 text-warm-gray leading-[1.8] pl-6 list-disc">
            <li>Aghe (Female)</li>
            <li>Ighokedo (Female)</li>
            <li>Eyako (Female)</li>
            <li>Esiewhenoja (Male)</li>
            <li>Powder (Male)</li>
            <li>Maccaver (Male)</li>
            <li>Omokieseri (Female)</li>
            <li>Akpoba, also known as Titi Rode (Female)</li>
            <li>Agnes, also known as Titi Otete (Female)</li>
            <li>Victoria (Female)</li>
          </ul>

          <p className="text-warm-gray leading-[1.8]">
            After some years in Eruemukohwarien, she and her siblings were taken
            to Okpara by their mother, Idonor, where they continued their
            upbringing within the embrace of family and community. Growing up
            among many siblings and relatives, she developed the strong family
            values, warmth, and sense of responsibility that remained with her
            throughout her life.
          </p>

          <div className="mx-auto h-px w-16 bg-border" />

          <p className="text-warm-gray leading-[1.8]">
            Our mother began her own journey into motherhood at a very young age,
            welcoming her first child when she was barely seventeen. Though she
            had no opportunity for formal education, she possessed a wisdom that
            life itself had taught her. She was naturally enterprising,
            hardworking, and remarkably astute in business. With determination
            and courage, she traded across various parts of Urhobo land,
            Kwale, and Benin, building her livelihood through resilience,
            discipline, and faith.
          </p>
          <p className="text-warm-gray leading-[1.8]">
            Her life journey took her across different parts of Nigeria,
            including Plateau State, Kaduna State, and Rivers State. In 2002, she
            relocated to East London in the United Kingdom, where she spent many
            years surrounded by family and loved ones. She lived there until
            2019, when she returned to Nigeria.
          </p>

          <div className="mx-auto h-px w-16 bg-border" />

          <p className="text-warm-gray leading-[1.8]">
            Our mother was a woman whose presence brought warmth wherever she
            went. Her smile was gentle and welcoming, her heart generous, and her
            love unconditional. She had a remarkable way of making everyone feel
            seen, valued, and cared for. To her children, she was a pillar of
            strength. To her grandchildren and great-grandchildren, she was a
            source of comfort, wisdom, and endless affection.
          </p>
          <p className="text-warm-gray leading-[1.8]">
            She lived a life defined by kindness, perseverance, and deep faith in
            God. Through every challenge she faced, she remained steadfast,
            trusting in God and giving love freely to those around her.
          </p>

          <div className="mx-auto h-px w-16 bg-border" />

          <p className="text-warm-gray leading-[1.8]">
            Today, we mourn her passing with heavy hearts, yet we also celebrate
            a life richly lived. The memories she created, the sacrifices she
            made, and the love she gave will forever remain with us. Her legacy
            lives on in the lives she nurtured, the family she raised, and the
            many people whose lives she touched.
          </p>
          <p className="text-warm-gray leading-[1.8]">
            Though her physical presence is no longer with us, we are comforted
            in knowing that she lived as a woman of faith. We believe she now
            rests peacefully and continues to watch over us.
          </p>

          <div className="mx-auto h-px w-16 bg-border" />

          {/* Surviving Children */}
          <div className="pt-4 text-center">
            <p className="font-[family-name:var(--font-serif)] text-xl font-light text-foreground">
              She is lovingly survived by her children:
            </p>
            <ul className="mt-6 space-y-2 text-warm-gray leading-[1.8]">
              <li>Catherine</li>
              <li>Philomena</li>
              <li>Francisca</li>
              <li>Beauty</li>
              <li>Jude (Late)</li>
              <li>Peter</li>
              <li>Pauline</li>
              <li>Pastor Dominic</li>
              <li>Pastor Georgine</li>
              <li>Ejiro</li>
              <li>Simple (Late)</li>
              <li>Francis</li>
              <li>Bright</li>
            </ul>
            <p className="mt-8 font-[family-name:var(--font-serif)] text-lg italic text-warm-gray-light">
              Forever in our hearts. Forever in our memories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
