import './VideoEmbed.css'

interface VideoEmbedProps {
  youtubeId: string
  title: string
  description?: string
}

export function VideoEmbed({ youtubeId, title, description }: VideoEmbedProps) {
  return (
    <div className="video-embed">
      <div className="video-embed-frame">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="video-embed-info">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}
