import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { characters, categoryColors, categoryLabels } from '../data/characters'

const W = 920
const H = 560
const NODE_R = 18

type SimNode = { id: string; x: number; y: number; vx: number; vy: number }
type SimEdge = { source: number; target: number; label: string }
type Tf = { x: number; y: number; s: number }

function buildGraph() {
  const nodes: SimNode[] = characters.map((c, i) => {
    const angle = (i / characters.length) * Math.PI * 2
    const r = Math.min(W, H) * 0.3
    return { id: c.id, x: W / 2 + Math.cos(angle) * r, y: H / 2 + Math.sin(angle) * r, vx: 0, vy: 0 }
  })
  const nodeIdx = new Map(nodes.map((n, i) => [n.id, i]))
  const seen = new Set<string>()
  const edges: SimEdge[] = []
  for (const c of characters) {
    if (!c.relations) continue
    for (const rel of c.relations) {
      const a = nodeIdx.get(c.id), b = nodeIdx.get(rel.id)
      if (a === undefined || b === undefined) continue
      const key = `${Math.min(a, b)}-${Math.max(a, b)}`
      if (!seen.has(key)) { seen.add(key); edges.push({ source: a, target: b, label: rel.label }) }
    }
  }
  for (let iter = 0; iter < 500; iter++) {
    for (const n of nodes) { n.vx += (W / 2 - n.x) * 0.0012; n.vy += (H / 2 - n.y) * 0.0012 }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y
        const d2 = Math.max(dx * dx + dy * dy, 1), dist = Math.sqrt(d2), f = 3200 / d2
        const fx = (dx / dist) * f, fy = (dy / dist) * f
        nodes[i].vx -= fx; nodes[i].vy -= fy; nodes[j].vx += fx; nodes[j].vy += fy
      }
    }
    for (const e of edges) {
      const a = nodes[e.source], b = nodes[e.target]
      const dx = b.x - a.x, dy = b.y - a.y, dist = Math.sqrt(dx * dx + dy * dy) || 1
      const f = (dist - 150) * 0.055, fx = (dx / dist) * f, fy = (dy / dist) * f
      a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy
    }
    for (const n of nodes) {
      n.vx *= 0.82; n.vy *= 0.82
      n.x = Math.max(52, Math.min(W - 52, n.x + n.vx))
      n.y = Math.max(52, Math.min(H - 52, n.y + n.vy))
    }
  }
  return { nodes, edges }
}

const categories = ['conseil', 'garde', 'artisan', 'erudit', 'diplomate', 'citoyen'] as const

function centerTf(el: HTMLElement): Tf {
  const { width, height } = el.getBoundingClientRect()
  return { x: (width - W) / 2, y: (height - H) / 2, s: 1 }
}

export function RelationsGraph() {
  const { nodes, edges } = useMemo(() => buildGraph(), [])
  const [tf, setTf] = useState<Tf>({ x: 0, y: 0, s: 1 })
  const tfRef = useRef(tf)
  tfRef.current = tf

  const [hovered, setHovered] = useState<string | null>(null)
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null)
  const didDragRef = useRef(false)
  const navigate = useNavigate()

  // Center on mount
  useEffect(() => {
    if (containerRef.current) setTf(centerTf(containerRef.current))
  }, [])

  // Wheel zoom (passive: false to prevent page scroll)
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12
    setTf(prev => {
      const ns = Math.max(0.2, Math.min(5, prev.s * factor))
      const ratio = ns / prev.s
      return { x: mx - (mx - prev.x) * ratio, y: my - (my - prev.y) * ratio, s: ns }
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  // Pan
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    dragRef.current = { sx: e.clientX, sy: e.clientY, tx: tfRef.current.x, ty: tfRef.current.y }
    didDragRef.current = false
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.sx, dy = e.clientY - dragRef.current.sy
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true
    const { tx, ty } = dragRef.current
    setTf(prev => ({ ...prev, x: tx + dx, y: ty + dy }))
  }
  const onMouseUp = () => { dragRef.current = null }

  function onNodeEnter(nodeId: string, nx: number, ny: number) {
    setHovered(nodeId)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const { x, y, s } = tfRef.current
      setAnchor({ x: rect.left + x + nx * s, y: rect.top + y + ny * s })
    }
  }

  function resetView() {
    if (containerRef.current) setTf(centerTf(containerRef.current))
  }

  const zoomBy = (factor: number) => setTf(prev => {
    if (!containerRef.current) return prev
    const { width, height } = containerRef.current.getBoundingClientRect()
    const cx = width / 2, cy = height / 2
    const ns = Math.max(0.2, Math.min(5, prev.s * factor))
    const ratio = ns / prev.s
    return { x: cx - (cx - prev.x) * ratio, y: cy - (cy - prev.y) * ratio, s: ns }
  })

  const hoveredEdges = hovered
    ? new Set(edges.filter(e => nodes[e.source].id === hovered || nodes[e.target].id === hovered).flatMap(e => [e.source, e.target]))
    : null
  const hoveredIdx = hovered ? nodes.findIndex(n => n.id === hovered) : -1
  const hoveredChar = hoveredIdx >= 0 ? characters[hoveredIdx] : null

  return (
    <div className="docs-page">
      <div className="page-header">
        <div className="page-badge">Visualisation</div>
        <h1 className="page-title">Graphe des Relations</h1>
        <p className="page-desc">Molette pour zoomer · Glisser pour déplacer · Clic pour la fiche</p>
      </div>

      <div
        ref={containerRef}
        className="relations-canvas-wrap"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { onMouseUp(); setHovered(null) }}
      >
        <svg width="100%" height="100%" style={{ display: 'block' }}>
          <defs>
            {nodes.map(n => (
              <clipPath key={n.id} id={`head-clip-${n.id}`}>
                <circle cx="0" cy="0" r={NODE_R} />
              </clipPath>
            ))}
          </defs>

          <g transform={`translate(${tf.x},${tf.y}) scale(${tf.s})`}>
            {edges.map((e, i) => {
              const a = nodes[e.source], b = nodes[e.target]
              const highlight = hoveredEdges?.has(e.source) && hoveredEdges?.has(e.target)
              return (
                <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={highlight ? 'rgba(196,152,60,0.7)' : 'rgba(196,152,60,0.10)'}
                  strokeWidth={highlight ? 2.5 / tf.s : 1 / tf.s}
                />
              )
            })}

            {nodes.map((n, i) => {
              const char = characters[i]
              const color = categoryColors[char.category]
              const isHov = hovered === n.id
              const url = char.minecraftUsername
                ? `https://mc-heads.net/avatar/${char.minecraftUsername}/36`
                : null

              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y})`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => onNodeEnter(n.id, n.x, n.y)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => { if (!didDragRef.current) navigate(`/personnages/${n.id}`) }}
                >
                  {isHov && <circle r={NODE_R + 14} fill={color + '0C'} stroke={color + '30'} strokeWidth={1.5 / tf.s} />}
                  {url
                    ? <image href={url} x={-NODE_R} y={-NODE_R} width={NODE_R * 2} height={NODE_R * 2} clipPath={`url(#head-clip-${n.id})`} />
                    : <circle r={NODE_R} fill={color + '28'} />
                  }
                  <circle r={NODE_R} fill="none" stroke={color} strokeWidth={isHov ? 2.5 / tf.s : 1.5 / tf.s} />
                  <text y={-(NODE_R + 7)} textAnchor="middle"
                    fill={isHov ? '#e4dccb' : '#8fa892'}
                    fontSize={(isHov ? 11 : 9) / tf.s}
                    fontFamily="'Cinzel', serif" letterSpacing="0.04em"
                  >
                    {char.firstName}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>

        {/* Legend overlay */}
        <div className="relations-legend-overlay">
          {categories.map(cat => (
            <div key={cat} className="relations-legend-item">
              <span className="relations-legend-dot" style={{ background: categoryColors[cat] }} />
              <span className="relations-legend-label">{categoryLabels[cat]}</span>
            </div>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="relations-controls">
          <button onClick={() => zoomBy(1.2)} title="Zoom avant"><ZoomIn size={14} /></button>
          <span className="relations-zoom-label">{Math.round(tf.s * 100)}%</span>
          <button onClick={() => zoomBy(1 / 1.2)} title="Zoom arrière"><ZoomOut size={14} /></button>
          <div className="relations-controls-sep" />
          <button onClick={resetView} title="Réinitialiser la vue"><Maximize2 size={14} /></button>
        </div>
      </div>

      {/* Popover */}
      {hovered && hoveredChar && createPortal(
        <div className="relations-popover" style={{ left: anchor.x, top: anchor.y }}>
          {hoveredChar.minecraftUsername && (
            <img src={`https://mc-heads.net/avatar/${hoveredChar.minecraftUsername}/40`} className="relations-popover-skin" alt="" />
          )}
          <div className="relations-popover-body">
            <p className="relations-popover-name">{hoveredChar.firstName} {hoveredChar.lastName}</p>
            <p className="relations-popover-role">{hoveredChar.role}</p>
            <p className="relations-popover-cat" style={{ color: categoryColors[hoveredChar.category] }}>
              {categoryLabels[hoveredChar.category]}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
