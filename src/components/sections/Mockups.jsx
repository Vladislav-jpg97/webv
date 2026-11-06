'use client';

// Встроенные макеты для демо-проектов (пока нет реальных скриншотов).
// Если у проекта задан image — показывается он (см. ProjectVisual).

function Frame({ children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/15 bg-[#0c0c14] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3.5 py-2.5">
        <i className="h-2 w-2 rounded-full bg-white/25" />
        <i className="h-2 w-2 rounded-full bg-white/25" />
        <i className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-white/[0.06]" />
      </div>
      {children}
    </div>
  );
}

function LandingMock() {
  return (
    <Frame>
      <div className="relative p-5">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/50 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <i className="h-3 w-16 rounded bg-white/70" />
          <div className="flex gap-2">
            <i className="h-2 w-8 rounded bg-white/25" />
            <i className="h-2 w-8 rounded bg-white/25" />
            <i className="h-2 w-8 rounded bg-white/25" />
          </div>
        </div>
        <div className="relative mt-8 space-y-2.5">
          <i className="block h-5 w-[70%] rounded bg-white/90" />
          <i className="block h-5 w-[48%] rounded bg-gradient-to-r from-accent to-electric" />
          <i className="mt-4 block h-2 w-[62%] rounded bg-white/25" />
          <i className="block h-2 w-[50%] rounded bg-white/25" />
        </div>
        <div className="relative mt-6 flex gap-2.5">
          <i className="block h-8 w-24 rounded-full bg-gradient-to-r from-accent to-electric" />
          <i className="block h-8 w-20 rounded-full border border-white/25" />
        </div>
        <div className="relative mt-8 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((k) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <i className="block h-5 w-5 rounded-md bg-accent/60" />
              <i className="mt-3 block h-2 w-3/4 rounded bg-white/50" />
              <i className="mt-1.5 block h-1.5 w-full rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function CorporateMock() {
  return (
    <div className="relative">
      <Frame className="relative z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <i className="h-3 w-14 rounded bg-white/70" />
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((k) => (
                <i key={k} className={`h-2 w-9 rounded ${k === 0 ? 'bg-electric' : 'bg-white/25'}`} />
              ))}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-3">
            <div className="rounded-xl bg-gradient-to-br from-electric/60 to-accent/40 p-4">
              <i className="block h-3.5 w-3/4 rounded bg-white/90" />
              <i className="mt-2 block h-2 w-1/2 rounded bg-white/50" />
              <i className="mt-6 block h-6 w-20 rounded-full bg-white/90" />
            </div>
            <div className="space-y-2">
              {[0, 1, 2].map((k) => (
                <div key={k} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2">
                  <i className="h-6 w-6 rounded bg-white/15" />
                  <div className="flex-1">
                    <i className="block h-1.5 w-full rounded bg-white/45" />
                    <i className="mt-1 block h-1.5 w-2/3 rounded bg-white/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((k) => (
              <i key={k} className="block h-12 rounded-lg border border-white/10 bg-white/[0.04]" />
            ))}
          </div>
        </div>
      </Frame>
      {/* вторая "страница" сзади */}
      <div className="absolute -bottom-4 -right-4 left-6 top-8 rounded-2xl border border-white/10 bg-white/[0.03]" />
      <div className="absolute -bottom-8 -right-8 left-12 top-16 rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
    </div>
  );
}

const mocks = { landing: LandingMock, corporate: CorporateMock };

// project.image -> реальный скриншот, иначе встроенный макет
export default function ProjectVisual({ project, title }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={title}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1024px) 520px, 90vw"
        className="h-auto w-full rounded-2xl border border-white/15 object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
      />
    );
  }
  const Mock = mocks[project.mock] || LandingMock;
  return <Mock />;
}
