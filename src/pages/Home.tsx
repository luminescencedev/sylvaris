import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { characters, categoryLabels, categoryColors } from '../data/characters'
import { CharacterCard } from '../components/CharacterCard'
import { PageBanner } from '../components/PageBanner'

const featured = characters.filter(c =>
  ['mina-vaelith', 'trim-vaelor', 'lumi-aervyn'].includes(c.id)
)

const HERO_BG = '/screen/sylvaris1.png'

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const duration = 1000
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(Math.round(eased * value))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-num">{display}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function Home() {
  return (
    <div className="docs-page">

      <PageBanner
        src={HERO_BG}
        label="Bibliothèque de Sylvaris"
        title="Sylvaris"
        subtitle="Cité Elfique · KCRP"
      />

      <div className="stat-row reveal">
        <AnimatedStat value={characters.length} label="Habitants" />
        <AnimatedStat value={characters.filter(c => c.originType === 'pur-sang-elf').length} label="Elfes" />
        <AnimatedStat value={characters.filter(c => c.category === 'conseil').length} label="Conseil" />
        <AnimatedStat value={characters.filter(c => c.category === 'garde').length} label="Veilleurs" />
      </div>

      <p className="prose" style={{ marginTop: 8 }}>
        Archives de Sylvaris — personnages, histoire et lore de la cité elfique sur KCRP.
      </p>

      <h2 className="section-h2">Figures de Sylvaris</h2>
      <p className="prose">
        Quelques personnages clés de la cité.
      </p>

      <div className="char-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {featured.map(c => <CharacterCard key={c.id} character={c} />)}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link to="/personnages" style={{ fontSize: 13, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
          Voir tous les personnages →
        </Link>
      </p>

      <h2 className="section-h2">Factions & Rôles</h2>
      <p className="prose">
        Les différents rôles au sein de la cité.
      </p>

      <div className="intro-cards">
        {(['conseil', 'garde', 'artisan', 'erudit', 'diplomate', 'citoyen'] as const).map(cat => {
          const count = characters.filter(c => c.category === cat).length
          const color = categoryColors[cat]
          const icons: Record<string, string> = {
            conseil: '👑', garde: '⚔️', artisan: '🏛️', erudit: '📜', diplomate: '🕊️', citoyen: '🌿'
          }
          return (
            <Link key={cat} to={`/personnages?cat=${cat}`} className="intro-card">
              <span className="intro-card-icon">{icons[cat]}</span>
              <span className="intro-card-title" style={{ color }}>{categoryLabels[cat]}</span>
              <span className="intro-card-desc">{count} personnage{count > 1 ? 's' : ''}</span>
            </Link>
          )
        })}
      </div>

      <h2 className="section-h2">Étendard de Sylvaris</h2>
      <div className="banner-showcase">
        <img
          src="/screen/sylvaris4.png"
          alt="Bannière de Sylvaris"
          className="banner-showcase-img"
        />
        <p className="banner-showcase-caption">
          L'étendard de Sylvaris — symbole de la cité elfique, aux couleurs de la forêt ancienne.
        </p>
      </div>

      <h2 className="section-h2">Histoire</h2>
      <p className="prose">
        Comment Sylvaris a été fondée, par qui, et pourquoi — les origines de la cité en texte complet.
      </p>
      <p>
        <Link to="/lore" style={{ fontSize: 13, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
          Lire le lore complet →
        </Link>
      </p>

    </div>
  )
}
