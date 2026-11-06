import { ImageResponse } from 'next/og';

export const alt = 'WebV — websites';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#fff',
          backgroundColor: '#07070b',
          backgroundImage:
            'radial-gradient(circle at 20% 15%, rgba(109,92,255,0.55), rgba(7,7,11,0) 55%), radial-gradient(circle at 90% 90%, rgba(47,123,255,0.45), rgba(7,7,11,0) 50%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, letterSpacing: 10, opacity: 0.9 }}>WebV</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Websites &amp; landing pages</div>
          <div style={{ display: 'flex', fontSize: 34, marginTop: 24, opacity: 0.65 }}>
            Independent web developer
          </div>
        </div>
      </div>
    ),
    size
  );
}
