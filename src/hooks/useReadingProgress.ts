import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setProgress(0)
    const scroller = document.querySelector('.docs-main') as HTMLElement | null

    const update = () => {
      const el = scroller ?? document.documentElement
      const { scrollTop, scrollHeight, clientHeight } = el
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
    }

    const target = scroller ?? window
    target.addEventListener('scroll', update, { passive: true })
    return () => target.removeEventListener('scroll', update)
  }, [location.pathname])

  return progress
}
