import { useReadingProgress } from '../hooks/useReadingProgress'

export function ProgressBar() {
  const progress = useReadingProgress()
  return (
    <div className="reading-progress-bar">
      <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  )
}
