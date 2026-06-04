import { useEffect, useRef, useState } from 'react'

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

    const skinUrl = username
      ? `https://mc-heads.net/skin/${username}`
      : 'https://mc-heads.net/skin/Steve'

    let cancelled = false

    import('skinview3d').then((mod) => {
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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(14, 32, 20, 0.5)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text-dim)',
          fontSize: '12px',
          fontFamily: 'var(--heading)',
          letterSpacing: '0.1em',
          textAlign: 'center',
          padding: '12px',
        }}
      >
        {username ? '⚠ Skin introuvable' : '— Inconnu —'}
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
