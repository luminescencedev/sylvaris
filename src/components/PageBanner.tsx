import { Particles } from './Particles'

interface PageBannerProps {
  src?: string
  label?: string
  title: string
  subtitle?: string
  size?: 'default' | 'sm'
}

export function PageBanner({ src, label, title, subtitle, size = 'default' }: PageBannerProps) {
  return (
    <div className={`page-banner${size === 'sm' ? ' page-banner--sm' : ''}`}>
      {src
        ? <img className="page-banner-bg" src={src} alt="" aria-hidden="true" />
        : <div className="page-banner-placeholder">✦</div>
      }
      <div className="page-banner-overlay" />
      <Particles />
      <div className="page-banner-content">
        {label && <span className="page-banner-label">{label}</span>}
        <h2 className="page-banner-title">{title}</h2>
        {subtitle && <p className="page-banner-sub">{subtitle}</p>}
      </div>
    </div>
  )
}
