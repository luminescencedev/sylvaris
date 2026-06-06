import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { characters, categoryColors, categoryLabels } from '../data/characters'

const W = 920
const H = 560
const NODE_R = 18

type SimNode = { id: string; x: number; y: number; vx: number; vy: number }
type SimEdge = { source: number; target: number; label: string }

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
      const a = nodeIdx.get(c.id)
      const b = nodeIdx.get(rel.id)
      if (a === undefined || b === undefined) continue
      const key = `${Math.min(a, b)}-${Math.max(a, b)}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push({ source: a, target: b, label: rel.label })
      }
    }
  }

  for (let iter = 0; iter < 500; iter++) {
    for (const n of nodes) {
      n.vx += (W / 2 - n.x) * 0.0012
      n.vy += (H / 2 - n.y) * 0.0012
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x
        const dy = nodes[j].y - nodes[i].y
        const d2 = Math.max(dx * dx + dy * dy, 1)
        const dist = Math.sqrt(d2)
        const f = 3200 / d2
        const fx = (dx / dist) * f
        const fy = (dy / dist) * f
        nodes[i].vx -= fx; nodes[i].vy -= fy
        nodes[j].vx += fx; nodes[j].vy += fy
      }
    }
    for (const e of edges) {
      const a = nodes[e.source], b = nodes[e.target]
      const dx = b.x - a.x, dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const f = (dist - 150) * 0.055
      const fx = (dx / dist) * f, fy = (dy / dist) * f
      a.vx += fx; a.vy += fy
      b.vx -= fx; b.vy -= fy
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

export function RelationsGraph() {
  const { nodes, edges } = useMemo(() => buildGraph(), [])
  const [hovered, setHovered] = useState<string | null>(null)
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const navigate = useNavigate()

  const hoveredEdges = hovered
    ? new Set(edges.filter(e => nodes[e.source].id === hovered || nodes[e.target].id === hovered).flatMap(e => [e.source, e.target]))
    : null

  const hoveredIdx = hovered ? nodes.findIndex(n => n.id === hovered) : -1
  const hoveredChar = hoveredIdx >= 0 ? characters[hoveredIdx] : null
  const hoveredNode = hoveredIdx >= 0 ? nodes[hoveredIdx] : null

  function onNodeEnter(nodeId: string, nodeX: number, nodeY: number) {
    setHovered(nodeId)
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect()
      setAnchor({
        x: rect.left + (nodeX / W) * rect.width,
        y: rect.top  + (nodeY / H) * rect.height,
      })
    }
  }

  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Visualisation</div>
        <h1 className="page-title">Graphe des Relations</h1>
        <p className="page-desc">Liens entre les personnages de Sylvaris. Survolez un nœud pour voir ses infos.</p>
      </div>

      <div className="relations-wrap reveal">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="relations-svg">
          <defs>
            {nodes.map(n => (
              <clipPath key={n.id} id={`head-clip-${n.id}`}>
                <circle cx="0" cy="0" r={NODE_R} />
              </clipPath>
            ))}
          </defs>

          {/* Edges */}
          {edges.map((e, i) => {
            const a = nodes[e.source], b = nodes[e.target]
            const highlight = hoveredEdges?.has(e.source) && hoveredEdges?.has(e.target)
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={highlight ? 'rgba(196,152,60,0.7)' : 'rgba(196,152,60,0.10)'}
                strokeWidth={highlight ? 2.5 : 1}
              />
            )
          })}

          {/* Nodes */}
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
                style={{ cursor: 'pointer', transition: 'opacity 200ms' }}
                onMouseEnter={() => onNodeEnter(n.id, n.x, n.y)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/personnages/${n.id}`)}
              >
                {isHov && (
                  <circle r={NODE_R + 14} fill={color + '0C'} stroke={color + '30'} strokeWidth={1} />
                )}

                {url ? (
                  <image
                    href={url}
                    x={-NODE_R} y={-NODE_R}
                    width={NODE_R * 2} height={NODE_R * 2}
                    clipPath={`url(#head-clip-${n.id})`}
                  />
                ) : (
                  <circle r={NODE_R} fill={color + '28'} />
                )}

                <circle r={NODE_R} fill="none" stroke={color} strokeWidth={isHov ? 2.5 : 1.5} />

                <text
                  y={-(NODE_R + 7)}
                  textAnchor="middle"
                  fill={isHov ? '#e4dccb' : '#8fa892'}
                  fontSize={isHov ? 11 : 9}
                  fontFamily="'Cinzel', serif"
                  letterSpacing="0.04em"
                >
                  {char.firstName}
                </text>
              </g>
            )
          })}
        </svg>

        <p className="relations-hint">Survolez pour les infos · Cliquez pour la fiche</p>
      </div>

      {/* Popover — rendu dans document.body via portal pour échapper aux transforms parents */}
      {hovered && hoveredChar && hoveredNode && createPortal(
        <div
          className="relations-popover"
          style={{ left: anchor.x, top: anchor.y }}
        >
          {hoveredChar.minecraftUsername && (
            <img
              src={`https://mc-heads.net/avatar/${hoveredChar.minecraftUsername}/40`}
              className="relations-popover-skin"
              alt=""
            />
          )}
          <div className="relations-popover-body">
            <p className="relations-popover-name">
              {hoveredChar.firstName} {hoveredChar.lastName}
            </p>
            <p className="relations-popover-role">{hoveredChar.role}</p>
            <p
              className="relations-popover-cat"
              style={{ color: categoryColors[hoveredChar.category] }}
            >
              {categoryLabels[hoveredChar.category]}
            </p>
          </div>
        </div>,
        document.body
      )}

      <h2 className="section-h2" style={{ marginTop: 40 }}>Légende</h2>
      <div className="relations-legend">
        {categories.map(cat => (
          <div key={cat} className="relations-legend-item">
            <span className="relations-legend-dot" style={{ background: categoryColors[cat] }} />
            <span className="relations-legend-label">{categoryLabels[cat]}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
