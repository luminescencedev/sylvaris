const PARTICLES = [
  { left: '8%',  bottom: '25%', delay: '0s',    duration: '6s',  size: 2 },
  { left: '18%', bottom: '15%', delay: '1.4s',  duration: '8s',  size: 3 },
  { left: '32%', bottom: '35%', delay: '0.6s',  duration: '5.5s',size: 2 },
  { left: '47%', bottom: '10%', delay: '2.1s',  duration: '7s',  size: 2 },
  { left: '58%', bottom: '28%', delay: '0.3s',  duration: '6.5s',size: 3 },
  { left: '70%', bottom: '18%', delay: '1.8s',  duration: '5s',  size: 2 },
  { left: '82%', bottom: '32%', delay: '0.9s',  duration: '7.5s',size: 2 },
  { left: '91%', bottom: '22%', delay: '2.5s',  duration: '6s',  size: 3 },
]

export function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
