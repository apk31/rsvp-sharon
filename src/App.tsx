import { HashRouter, Routes, Route, NavLink, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Dashboard from "./pages/Dashboard"
import Undangan from "./pages/Undangan"

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div
      key={location.pathname}
      className="animate-pageFade"
    >
      {children}
    </div>
  )
}
function App() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(true)
const [fadeOut, setFadeOut] = useState(false)

useEffect(() => {
  const timer1 = setTimeout(() => {
    setFadeOut(true)   // mulai fade
  }, 600)

  const timer2 = setTimeout(() => {
    setLoading(false)  // hilangkan splash
  }, 1000)

  return () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
  }
}, [])

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
    setDark(!dark)
  }
  if (loading) {
  return (
    <div
      className={`
        h-screen flex items-center justify-center
        bg-gradient-to-br 
        from-[#f6f1e7] via-[#f3eadc] to-[#efe4d2]
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        transition-opacity duration-500
        ${fadeOut ? "opacity-0" : "opacity-100"}
      `}
    >
      <div className="text-center space-y-6">
        <div className="text-3xl font-bold tracking-wide">
          RSVP Sharon Dashboard
        </div>

        {/* Progress Bar */}
        <div className="w-40 h-1 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-green-500 animate-progress"></div>
        </div>
      </div>
    </div>
  )
}
  return (
  <HashRouter>
    
    <div className="
  min-h-screen flex flex-col
  bg-gradient-to-br 
  from-[#f6f1e7] via-[#f3eadc] to-[#efe4d2]
  dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
">

      {/* ===== NAVBAR ===== */}
      <nav className="border-b border-slate-300 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-xl font-bold">
            RSVP Sharon
          </h1>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className="hover:text-blue-500">
              Dashboard
            </NavLink>

            <NavLink to="/undangan" className="hover:text-blue-500">
              Undangan
            </NavLink>

            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen(prev => !prev)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden px-6 pb-4 space-y-3">
            <NavLink to="/" onClick={() => setOpen(false)} className="block">
              Dashboard
            </NavLink>
            <NavLink to="/undangan" onClick={() => setOpen(false)} className="block">
              Undangan
            </NavLink>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        )}
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow">
  <PageWrapper>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/undangan" element={<Undangan />} />
    </Routes>
  </PageWrapper>
</main>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-4 
                         text-sm text-slate-500 
                         border-t border-slate-300 
                         dark:border-slate-800">
        © Penguin Berjalan 2018–2026
      </footer>

    </div>
  </HashRouter>
)
}

export default React.memo(App)
