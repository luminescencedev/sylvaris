import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, User, BookOpen, Music } from 'lucide-react'
import { characters, categoryColors } from '../data/characters'
import { kcrpLore, sylvarisLore } from '../data/lore'
import { musiques } from '../data/musiques'

interface SearchResult {
  type: 'character' | 'lore' | 'musique'
  id: string
  title: string
  subtitle?: string
  href: string
  color?: string
}

function runSearch(q: string): SearchResult[] {
  if (!q.trim()) return []
  const term = q.toLowerCase()
  const out: SearchResult[] = []

  for (const c of characters) {
    if ([c.firstName, c.lastName, c.role, c.origin, c.allegiance].join(' ').toLowerCase().includes(term)) {
      out.push({ type: 'character', id: c.id, title: `${c.firstName} ${c.lastName}`, subtitle: c.role, href: `/personnages/${c.id}`, color: categoryColors[c.category] })
    }
  }
  for (const s of [kcrpLore, sylvarisLore]) {
    if (s.title.toLowerCase().includes(term) || s.content.some(p => p.toLowerCase().includes(term))) {
      out.push({ type: 'lore', id: s.id, title: s.title, subtitle: s.subtitle, href: '/lore' })
    }
  }
  for (const m of musiques) {
    if (`${m.title} ${m.artist ?? ''}`.toLowerCase().includes(term)) {
      out.push({ type: 'musique', id: m.id, title: m.title, subtitle: m.artist, href: `/musiques/${m.id}` })
    }
  }
  return out
}

const ICON_COMPONENTS = {
  character: User,
  lore: BookOpen,
  musique: Music,
} as const
const GROUP_LABELS: Record<string, string> = { character: 'Personnages', lore: 'Histoire & Lore', musique: 'Musiques' }

interface Props { open: boolean; onClose: () => void }

export function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => runSearch(query), [query])

  useEffect(() => {
    if (open) { setQuery(''); setActiveIdx(0); setTimeout(() => inputRef.current?.focus(), 40) }
  }, [open])

  useEffect(() => { setActiveIdx(0) }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && results[activeIdx]) { navigate(results[activeIdx].href); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, activeIdx, navigate, onClose])

  if (!open) return null

  const types = ['character', 'lore', 'musique'] as const
  let idx = 0

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Rechercher personnage, lore, musique…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className="search-kbd">Échap</kbd>
        </div>
        <div className="search-results">
          {!query && <p className="search-empty">Tapez pour commencer…</p>}
          {query && results.length === 0 && <p className="search-empty">Aucun résultat pour « {query} »</p>}
          {types.map(type => {
            const items = results.filter(r => r.type === type)
            if (items.length === 0) return null
            return (
              <div key={type}>
                <p className="search-group-label">{GROUP_LABELS[type]}</p>
                {items.map(result => {
                  const thisIdx = idx++
                  return (
                    <div
                      key={result.id}
                      className={`search-result${thisIdx === activeIdx ? ' search-result--active' : ''}`}
                      onMouseEnter={() => setActiveIdx(thisIdx)}
                      onClick={() => { navigate(result.href); onClose() }}
                    >
                      <span
                        className="search-result-icon"
                        style={result.color ? { borderColor: result.color + '50', color: result.color } : {}}
                      >
                        {(() => { const Icon = ICON_COMPONENTS[type]; return <Icon size={15} /> })()}
                      </span>
                      <div>
                        <p className="search-result-title">{result.title}</p>
                        {result.subtitle && <p className="search-result-sub">{result.subtitle}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="search-footer">
          <span>↑↓ naviguer</span>
          <span>↵ ouvrir</span>
          <span>Échap fermer</span>
        </div>
      </div>
    </div>
  )
}
