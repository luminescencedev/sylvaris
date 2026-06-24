// ══════════════════════════════════════════════════════════════════
//  Carte de Sylvaris — couche API
//  À configurer une fois les accès serveur obtenus.
// ══════════════════════════════════════════════════════════════════

export type MapProvider = 'bluemap' | 'dynmap'

// ── Configuration principale ───────────────────────────────────────
//  TODO: Remplir les champs marqués ← FILL après réception des accès

export interface MapConfig {
  provider: MapProvider
  /** URL racine du serveur de tuiles (sans slash final) */
  serverUrl: string
  /** ID du monde/carte côté serveur (souvent "world") */
  worldId: string
  /**
   * Template de l'URL de tuile, utilisé par Leaflet.
   * Laisser vide pour utiliser les défauts ci-dessous.
   * Variables disponibles : {x} {y} {z} (zoom Leaflet)
   */
  tileUrlTemplate?: string
  /** Bounds Minecraft de la zone à afficher (évite le hors-Sylvaris) */
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number }
  /** Centre initial de la carte, en coordonnées Minecraft */
  center: { x: number; z: number }
  defaultZoom: number
  minZoom: number
  maxZoom: number
  /** Rafraîchissement des positions de joueurs en secondes (0 = off) */
  liveRefreshSec: number
}

export const MAP_CONFIG: MapConfig = {
  provider: 'bluemap',                          // ← FILL  'bluemap' | 'dynmap'
  serverUrl: 'https://TODO_MAP_SERVER_URL',     // ← FILL  ex: 'https://map.kcrp.fr'
  worldId: 'world',                             // ← FILL  ID du monde BlueMap / Dynmap
  bounds: {
    minX: -1000, maxX: 1000,                    // ← FILL  vraies coords Minecraft
    minZ: -1000, maxZ: 1000,
  },
  center: { x: 0, z: 0 },                      // ← FILL  centre de Sylvaris
  defaultZoom: 3,
  minZoom: 1,
  maxZoom: 7,
  liveRefreshSec: 10,
}

/** True dès que serverUrl est renseigné */
export const IS_CONFIGURED = !MAP_CONFIG.serverUrl.includes('TODO')

// ── Marqueurs statiques ────────────────────────────────────────────
//  TODO: Mettre à jour x/z une fois la carte reçue

export type MarkerType = 'district' | 'building' | 'landmark' | 'gate'

export interface MapMarker {
  id: string
  label: string
  description?: string
  x: number    // Minecraft X
  z: number    // Minecraft Z
  type: MarkerType
}

export const SYLVARIS_MARKERS: MapMarker[] = [
  { id: 'centre',      label: 'Place Centrale',        x: 0,     z: 0,    type: 'landmark',  description: 'Cœur de la cité elfique.' },
  { id: 'conseil',     label: 'Haut Conseil',           x: 50,    z: -80,  type: 'building',  description: 'Siège du Haut Conseil de Sylvaris.' },
  { id: 'caserne',     label: 'Caserne des Gardes',     x: -120,  z: 30,   type: 'building',  description: 'Quartier général des Veilleurs & Gardes.' },
  { id: 'artisans',    label: 'Quartier des Artisans',  x: 80,    z: 120,  type: 'district',  description: 'Ateliers et forges elfiques.' },
  { id: 'bibliotheque',label: 'Bibliothèque',           x: -60,   z: -50,  type: 'building',  description: 'La Bibliothèque de Sylvaris — mémoire de la cité.' },
  { id: 'port',        label: 'Port',                   x: 200,   z: 80,   type: 'landmark',  description: 'Point d\'arrivée des expéditions.' },
  { id: 'porte-nord',  label: 'Porte Nord',             x: 0,     z: -300, type: 'gate',      description: 'Entrée principale de la cité.' },
]

// ── Coordonnées ────────────────────────────────────────────────────
//  L.CRS.Simple : lat = −Z, lng = X  (Z Minecraft est inversé)

export function mcToLatLng(x: number, z: number): [number, number] {
  return [-z, x]
}

export function latLngToMc(lat: number, lng: number): { x: number; z: number } {
  return { x: lng, z: -lat }
}

// ── URL de tuile ───────────────────────────────────────────────────

export function buildTileUrl(): string {
  const { serverUrl, worldId, provider, tileUrlTemplate } = MAP_CONFIG

  if (tileUrlTemplate) return tileUrlTemplate

  // Formats par défaut — à vérifier / ajuster selon la version du plugin
  if (provider === 'bluemap') {
    // BlueMap 4.x flat view
    return `${serverUrl}/maps/${worldId}/tiles/{z}/{x}_{y}.png`
  }
  // Dynmap flat view
  return `${serverUrl}/tiles/${worldId}/flat/{z}/{x}_{y}.png`
}

// ── Joueurs en direct ──────────────────────────────────────────────

export interface LivePlayer {
  name: string
  x: number
  y: number
  z: number
  world: string
}

export async function fetchLivePlayers(): Promise<LivePlayer[]> {
  if (!IS_CONFIGURED) return []
  const { serverUrl, worldId, provider } = MAP_CONFIG
  try {
    if (provider === 'bluemap') {
      const res = await fetch(`${serverUrl}/maps/${worldId}/live/players.json`)
      if (!res.ok) return []
      const data = await res.json()
      return (data.players ?? []) as LivePlayer[]
    }
    if (provider === 'dynmap') {
      const res = await fetch(`${serverUrl}/up/world/${worldId}/0`)
      if (!res.ok) return []
      const data = await res.json()
      return (data.players ?? []).map((p: Record<string, unknown>) => ({
        name: p.name as string,
        x: p.x as number,
        y: p.y as number,
        z: p.z as number,
        world: p.world as string,
      }))
    }
  } catch {
    // CORS ou serveur inaccessible — silencieux
  }
  return []
}
