import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Wifi, WifiOff, RotateCcw } from 'lucide-react'
import {
  MAP_CONFIG,
  IS_CONFIGURED,
  SYLVARIS_MARKERS,
  buildTileUrl,
  fetchLivePlayers,
  mcToLatLng,
  type MarkerType,
} from '../api/map'

// ── Icônes par type de marqueur ────────────────────────────────────

const MARKER_COLORS: Record<MarkerType, string> = {
  landmark: '#c4983c',
  building: '#7eb89e',
  district: '#a07cc8',
  gate:     '#e08060',
}

const MARKER_LABELS: Record<MarkerType, string> = {
  landmark: 'Lieu emblématique',
  building: 'Bâtiment',
  district: 'Quartier',
  gate:     'Entrée / Porte',
}

function makeSylvarisIcon(type: MarkerType) {
  const color = MARKER_COLORS[type]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 2C7.4 2 2 7.4 2 14c0 9 12 20 12 20s12-11 12-20C26 7.4 20.6 2 14 2z"
        fill="${color}" stroke="rgba(0,0,0,0.35)" stroke-width="1.5"/>
      <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.9)"/>
    </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  })
}

function makePlayerIcon(name: string) {
  const svg = `
    <div style="
      background: rgba(5,10,7,0.88);
      border: 1.5px solid rgba(196,152,60,0.6);
      border-radius: 6px;
      padding: 3px 8px;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      color: #c4983c;
      white-space: nowrap;
      letter-spacing: 0.05em;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    ">● ${name}</div>`
  return L.divIcon({ html: svg, className: '', iconAnchor: [0, 0] })
}

// ── Placeholder quand non configuré ───────────────────────────────

function MapPlaceholder() {
  return (
    <div className="map-placeholder">
      <div className="map-placeholder-inner">
        <MapPin size={40} className="map-placeholder-icon" />
        <h2 className="map-placeholder-title">Carte non configurée</h2>
        <p className="map-placeholder-desc">
          En attente des accès au serveur de tuiles.<br />
          Une fois reçus, renseigner <code>MAP_CONFIG</code> dans <code>src/api/map.ts</code>.
        </p>
        <div className="map-placeholder-checklist">
          <p className="map-placeholder-check">→ <code>serverUrl</code> — URL du serveur BlueMap / Dynmap</p>
          <p className="map-placeholder-check">→ <code>worldId</code> — Identifiant du monde sur le serveur</p>
          <p className="map-placeholder-check">→ <code>bounds</code> — Coordonnées Minecraft de la zone Sylvaris</p>
          <p className="map-placeholder-check">→ <code>center</code> — Centre initial de la vue</p>
          <p className="map-placeholder-check">→ <code>SYLVARIS_MARKERS[*].x / .z</code> — Coords des marqueurs</p>
        </div>
      </div>
    </div>
  )
}

// ── Page principale ────────────────────────────────────────────────

export function MapPage() {
  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const playerLayerRef = useRef<L.LayerGroup | null>(null)
  const [liveOn, setLiveOn] = useState(MAP_CONFIG.liveRefreshSec > 0)
  const [playerCount, setPlayerCount] = useState(0)

  // Initialise Leaflet une fois
  useEffect(() => {
    if (!IS_CONFIGURED || !mapDivRef.current || mapRef.current) return

    const { bounds, center, defaultZoom, minZoom, maxZoom } = MAP_CONFIG

    // CRS simple (coordonnées Minecraft directes)
    const map = L.map(mapDivRef.current, {
      crs: L.CRS.Simple,
      zoom: defaultZoom,
      minZoom,
      maxZoom,
      zoomControl: false,
      attributionControl: false,
    })
    mapRef.current = map

    // Centre initial
    map.setView(mcToLatLng(center.x, center.z), defaultZoom)

    // Bounds de restriction (empêche de sortir de Sylvaris)
    const sw = mcToLatLng(bounds.minX, bounds.maxZ)
    const ne = mcToLatLng(bounds.maxX, bounds.minZ)
    map.setMaxBounds(L.latLngBounds(sw, ne).pad(0.15))

    // Tuiles
    L.tileLayer(buildTileUrl(), {
      minZoom,
      maxZoom,
      tileSize: 512,
      zoomOffset: -1,
      noWrap: true,
    }).addTo(map)

    // Marqueurs statiques
    const staticLayer = L.layerGroup().addTo(map)
    for (const m of SYLVARIS_MARKERS) {
      const marker = L.marker(mcToLatLng(m.x, m.z), { icon: makeSylvarisIcon(m.type) })
      if (m.description) {
        marker.bindPopup(`
          <div class="map-popup">
            <p class="map-popup-title">${m.label}</p>
            <p class="map-popup-desc">${m.description}</p>
          </div>`, { className: 'map-popup-wrap', maxWidth: 220 }
        )
      } else {
        marker.bindTooltip(m.label, { direction: 'top', className: 'map-tooltip' })
      }
      staticLayer.addLayer(marker)
    }

    // Layer joueurs (rempli par le polling)
    playerLayerRef.current = L.layerGroup().addTo(map)

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Polling live players
  useEffect(() => {
    if (!IS_CONFIGURED || !liveOn) return

    async function refresh() {
      const players = await fetchLivePlayers()
      const layer = playerLayerRef.current
      if (!layer) return
      layer.clearLayers()
      for (const p of players) {
        if (p.world !== MAP_CONFIG.worldId) continue
        L.marker(mcToLatLng(p.x, p.z), { icon: makePlayerIcon(p.name) }).addTo(layer)
      }
      setPlayerCount(players.length)
    }

    refresh()
    const id = setInterval(refresh, MAP_CONFIG.liveRefreshSec * 1000)
    return () => clearInterval(id)
  }, [liveOn])

  function resetView() {
    if (!mapRef.current) return
    const { center, defaultZoom } = MAP_CONFIG
    mapRef.current.setView(mcToLatLng(center.x, center.z), defaultZoom, { animate: true })
  }

  return (
    <div className="docs-page">
      <div className="page-header">
        <div className="page-badge">Carte</div>
        <h1 className="page-title">Carte de Sylvaris</h1>
        <p className="page-desc">
          Carte interactive de la cité elfique. Cliquez sur un marqueur pour les détails.
        </p>
      </div>

      {!IS_CONFIGURED ? (
        <MapPlaceholder />
      ) : (
        <div className="map-canvas-wrap">
          <div ref={mapDivRef} className="map-leaflet" />

          {/* Légende */}
          <div className="map-legend">
            {(Object.keys(MARKER_COLORS) as MarkerType[]).map(type => (
              <div key={type} className="map-legend-item">
                <span className="map-legend-dot" style={{ background: MARKER_COLORS[type] }} />
                <span className="map-legend-label">{MARKER_LABELS[type]}</span>
              </div>
            ))}
          </div>

          {/* Contrôles */}
          <div className="map-controls">
            <button onClick={resetView} title="Réinitialiser la vue" className="map-ctrl-btn">
              <RotateCcw size={14} />
            </button>
            <div className="map-controls-sep" />
            <button
              onClick={() => setLiveOn(v => !v)}
              title={liveOn ? 'Désactiver le live' : 'Activer le live'}
              className={`map-ctrl-btn${liveOn ? ' map-ctrl-btn--active' : ''}`}
            >
              {liveOn ? <Wifi size={14} /> : <WifiOff size={14} />}
            </button>
            {liveOn && (
              <span className="map-live-count">
                {playerCount} joueur{playerCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
