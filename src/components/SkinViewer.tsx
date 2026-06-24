import { useEffect, useRef, useState } from 'react'
import { getCachedSkin } from '../lib/skinCache'

interface SkinViewerProps {
  username?: string
  width?: number
  height?: number
  className?: string
  animate?: boolean
}

export function SkinViewer({ username, width = 160, height = 300, className, animate = true }: SkinViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<{ dispose: () => void } | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    setLoaded(false)
    setError(false)

    let cancelled = false

    const target = username ?? 'Steve'

    Promise.all([import('skinview3d'), getCachedSkin(target)]).then(([mod, skinUrl]) => {
      if (cancelled || !canvasRef.current) return
      try {
        const viewer = new mod.SkinViewer({
          canvas: canvasRef.current,
          width,
          height,
          skin: skinUrl,
        })

        viewer.autoRotate = animate
        viewer.autoRotateSpeed = 0.6
        viewer.zoom = 0.85
        viewer.globalLight.intensity = 3
        viewer.cameraLight.intensity = 0.8
        viewer.renderer.setClearColor(0x000000, 0)

        const animation = new mod.IdleAnimation()
        animation.speed = 0.4
        viewer.animation = animation

        viewerRef.current = viewer
        setLoaded(true)
      } catch {
        setError(true)
      }
    }).catch(() => {
      if (!cancelled) setError(true)
    })

    return () => {
      cancelled = true
      viewerRef.current?.dispose()
      viewerRef.current = null
    }
  }, [username, width, height, animate])

  if (error || !username) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          color: 'var(--text-3)',
          opacity: 0.5,
        }}
      >
        <svg width="36" height="56" viewBox="0 0 36 56" fill="none" aria-hidden="true">
          <circle cx="18" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 32 C4 22 8 18 18 18 C28 18 32 22 32 32 L32 52 L4 52 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <line x1="18" y1="30" x2="18" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {username ? 'Introuvable' : 'Inconnu'}
        </span>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width, height }} className={className}>
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-dim)',
            fontSize: '11px',
            fontFamily: 'var(--heading)',
            letterSpacing: '0.1em',
          }}
        >
          Chargement…
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ background: 'transparent', opacity: loaded ? 1 : 0, transition: 'opacity 120ms ease' }}
      />
    </div>
  )
}
