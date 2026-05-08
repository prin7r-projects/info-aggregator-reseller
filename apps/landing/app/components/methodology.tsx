export function Methodology() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-page px-6 py-24 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 mb-3">
              Methodology
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">
              § An-SRC-26
            </p>
          </div>
          <blockquote className="lg:col-span-8 font-serif text-[28px] leading-[1.25] tracking-[-0.02em] md:text-[36px] text-paper">
            &ldquo;A summary without a citation is an opinion. A citation without a
            <span className="under decoration-oxblood"> source-ID</span> is a
            <span className="under decoration-oxblood"> rumor</span>. We are in the
            business of replacing both with a paragraph an analyst can hand to her
            partner without re-keying.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
