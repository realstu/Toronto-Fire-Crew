import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Red glow */}
        <div style={{
          position: 'absolute',
          bottom: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(220,38,38,0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{
          background: '#dc2626',
          borderRadius: '16px',
          width: 72,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </div>

        {/* Title */}
        <div style={{
          fontSize: 80,
          fontWeight: 900,
          color: 'white',
          letterSpacing: '-3px',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: 8,
        }}>
          Toronto Fire Crew
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 28,
          color: '#94a3b8',
          marginTop: 16,
        }}>
          Members Only · Private Community
        </div>
      </div>
    ),
    { ...size }
  )
}
