import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import { Sidebar, SidebarProvider, SidebarOverlay } from './components/Sidebar'
import { BackToTop } from './components/BackToTop'
import { GlobalSearch } from './components/GlobalSearch'
import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { CharacterDetail } from './pages/CharacterDetail'
import { Lore } from './pages/Lore'
import { Videos } from './pages/Videos'
import { Gallery } from './pages/Gallery'
import { Musiques } from './pages/Musiques'
import { MusiqueDetail } from './pages/MusiqueDetail'
import { Chronologie } from './pages/Chronologie'
import { Lexique } from './pages/Lexique'
import { RelationsGraph } from './pages/RelationsGraph'
import { NotFound } from './pages/NotFound'
import { useLenis } from './hooks/useLenis'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useLenis()
  useScrollReveal()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <SidebarProvider>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <BackToTop />
      <div className="docs-root">
        <Topbar onOpenSearch={() => setSearchOpen(true)} />
        <SidebarOverlay />
        <div className="docs-body">
          <Sidebar />
          <main className="docs-main">
            <div className="docs-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/personnages" element={<Characters />} />
                <Route path="/personnages/:id" element={<CharacterDetail />} />
                <Route path="/lore" element={<Lore />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/musiques" element={<Musiques />} />
                <Route path="/musiques/:id" element={<MusiqueDetail />} />
                <Route path="/chronologie" element={<Chronologie />} />
                <Route path="/lexique" element={<Lexique />} />
                <Route path="/relations" element={<RelationsGraph />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
