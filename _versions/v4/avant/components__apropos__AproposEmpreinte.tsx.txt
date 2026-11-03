export function AproposEmpreinte() {
  return (
    <section
      id="empreinte"
      className="scroll-mt-28 relative overflow-hidden bg-beige-950 px-4 py-24 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20" />
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30" />
        <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/45" />
        <div className="absolute left-1/2 top-[42%] h-px w-[70%] -translate-x-1/2 rotate-[-8deg] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
          L&apos;empreinte
        </p>
        <h2 className="mt-4 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
          « L&apos;empreinte de votre marque »
        </h2>
        <p className="mt-6 text-[15px] leading-relaxed text-white/75 sm:text-base lg:text-[17px]">
          Pour NYAKA, une marque ne se limite pas à son logo. Elle laisse une
          empreinte à travers ce que les personnes reconnaissent, comprennent,
          ressentent et retiennent lorsqu&apos;elles interagissent avec elle.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/75 sm:text-base lg:text-[17px]">
          Cette empreinte se construit dans l&apos;identité, les messages, les
          supports, les contenus, les expériences et les outils utilisés par
          l&apos;organisation.
        </p>
        <p className="mt-8 font-display text-xl font-bold text-white sm:text-2xl lg:text-[28px]">
          L&apos;objectif n&apos;est pas d&apos;être visible partout. Il est
          d&apos;être reconnaissable et cohérent là où cela compte.
        </p>
      </div>
    </section>
  );
}
