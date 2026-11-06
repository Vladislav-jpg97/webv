// SVG-иллюстрации для карточек услуг. Реагируют на hover родителя (.group).

export function LandingArt() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="la-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b7bff" />
          <stop offset="1" stopColor="#4f6bff" />
        </linearGradient>
        <linearGradient id="la-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopColor="#fff" stopOpacity=".02" />
        </linearGradient>
      </defs>
      <g className="origin-center transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3">
        <rect x="64" y="58" width="196" height="136" rx="16" fill="url(#la-b)" stroke="#fff" strokeOpacity=".08" />
      </g>
      <g className="origin-center transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:translate-y-1.5">
        <rect x="52" y="44" width="196" height="136" rx="16" fill="url(#la-b)" stroke="#fff" strokeOpacity=".14" />
      </g>
      <g className="transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-3">
        <rect x="40" y="30" width="196" height="136" rx="16" fill="#12121c" stroke="#fff" strokeOpacity=".22" />
        <circle cx="58" cy="46" r="3" fill="#fff" fillOpacity=".3" />
        <circle cx="69" cy="46" r="3" fill="#fff" fillOpacity=".3" />
        <circle cx="80" cy="46" r="3" fill="#fff" fillOpacity=".3" />
        <rect x="58" y="68" width="110" height="9" rx="4.5" fill="#fff" fillOpacity=".85" />
        <rect x="58" y="84" width="76" height="9" rx="4.5" fill="url(#la-a)" />
        <rect x="58" y="104" width="130" height="5" rx="2.5" fill="#fff" fillOpacity=".25" />
        <rect x="58" y="114" width="104" height="5" rx="2.5" fill="#fff" fillOpacity=".25" />
        <rect x="58" y="134" width="64" height="22" rx="11" fill="url(#la-a)" />
        <rect x="170" y="130" width="52" height="30" rx="8" fill="url(#la-a)" fillOpacity=".25" stroke="#8b7bff" strokeOpacity=".6" />
      </g>
      <circle cx="268" cy="44" r="5" fill="#8b7bff" className="floaty" style={{ '--fd': '4s' }} />
      <circle cx="285" cy="196" r="3" fill="#5fd0ff" className="floaty" style={{ '--fd': '5s', '--fdelay': '1s' }} />
    </svg>
  );
}

export function MultiPageArt() {
  const pages = [
    { x: 118, y: 18, c: 1 },
    { x: 28, y: 100, c: 0 },
    { x: 118, y: 100, c: 0 },
    { x: 208, y: 100, c: 0 },
    { x: 73, y: 168, c: 0 },
    { x: 163, y: 168, c: 0 },
  ];
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mp-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#2f7bff" />
        </linearGradient>
      </defs>
      <g stroke="#5b8cff" strokeOpacity=".55" strokeWidth="1.5" className="dash-flow">
        <path d="M148 68 V84 M148 84 H58 V100 M148 84 H148 V100 M148 84 H238 V100" />
        <path d="M58 150 V160 H103 V168 M148 150 V160 H193 V168" />
      </g>
      {pages.map((p, i) => (
        <g
          key={i}
          className="transition-transform duration-700 ease-out"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <g className={i % 2 ? 'group-hover:-translate-y-1.5' : 'group-hover:translate-y-1.5'} style={{ transition: 'transform .7s cubic-bezier(.2,.8,.2,1)' }}>
            <rect x={p.x} y={p.y} width="60" height="50" rx="9" fill={p.c ? 'url(#mp-a)' : '#12121c'} stroke="#fff" strokeOpacity={p.c ? 0 : 0.18} />
            <rect x={p.x + 9} y={p.y + 11} width="32" height="5" rx="2.5" fill="#fff" fillOpacity={p.c ? 0.9 : 0.55} />
            <rect x={p.x + 9} y={p.y + 22} width="42" height="4" rx="2" fill="#fff" fillOpacity={p.c ? 0.5 : 0.2} />
            <rect x={p.x + 9} y={p.y + 31} width="26" height="4" rx="2" fill="#fff" fillOpacity={p.c ? 0.5 : 0.2} />
          </g>
        </g>
      ))}
      <circle cx="148" cy="84" r="4" fill="#5fd0ff" className="floaty" style={{ '--fd': '3s' }} />
    </svg>
  );
}

export const serviceArt = { landing: LandingArt, multipage: MultiPageArt };
