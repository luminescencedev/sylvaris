import { Routes, Route } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import { Sidebar, SidebarProvider, SidebarOverlay } from './components/Sidebar'
import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { CharacterDetail } from './pages/CharacterDetail'
import { Lore } from './pages/Lore'
import { Videos } from './pages/Videos'

function App() {
  return (
    <SidebarProvider>
      <div className="docs-root">
        <Topbar />
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
                <Route path="/videos" element={<Videos />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
