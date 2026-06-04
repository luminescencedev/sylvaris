import { kcrpLore, sylvarisLore, presentationTemplate } from '../data/lore'

export function Lore() {
  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Archives</div>
        <h1 className="page-title">Histoire & Lore</h1>
        <p className="page-desc">
          Les origines du monde, la fondation de Sylvaris et les textes fondateurs qui façonnent le destin de la cité elfique.
        </p>
      </div>

      <h2 className="section-h2">{kcrpLore.title}</h2>
      <p style={{ fontSize: 11, fontFamily: 'var(--font-heading)', letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>
        {kcrpLore.subtitle}
      </p>

      <div className="lore-block">
        <span className="lore-numeral">I</span>
        <div className="lore-text">
          {kcrpLore.content.map((para, i) => (
            <p key={i} className="prose" style={{ marginBottom: 0 }}>{para}</p>
          ))}
        </div>
      </div>

      <h2 className="section-h2">{sylvarisLore.title}</h2>
      <p style={{ fontSize: 11, fontFamily: 'var(--font-heading)', letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>
        {sylvarisLore.subtitle}
      </p>

      <div className="lore-block">
        <span className="lore-numeral">II</span>
        <div className="lore-text">
          {sylvarisLore.content.map((para, i) => (
            <p
              key={i}
              className="prose"
              style={{
                marginBottom: 0,
                ...(para.length < 40 ? {
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'normal',
                  fontSize: 16,
                  color: 'var(--primary)',
                  textAlign: 'center',
                  padding: '4px 0',
                } : {})
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      <h2 className="section-h2">Rejoindre Sylvaris</h2>
      <p className="prose" style={{ marginBottom: 16 }}>
        Avant de fouler pleinement les terres de Sylvaris, tout habitant doit se présenter
        afin que les habitants puissent apprendre à le connaître.
      </p>

      <div className="template-list">
        {presentationTemplate.map(({ key, description }) => (
          <div key={key} className="template-row">
            <span className="template-key">✧ {key}</span>
            <span className="template-desc">{description}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
