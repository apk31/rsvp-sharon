import { HashRouter, Routes, Route, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import Dashboard from "./pages/Dashboard"
import Undangan from "./pages/Undangan"

function App() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

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

  return (
    <HashRouter>
      <nav className="border-b border-slate-300 dark:border-slate-800 bg-creamSoft dark:bg-slate-950">
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

          {/* Mobile */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
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

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/undangan" element={<Undangan />} />
      </Routes>
    </HashRouter>
  )
}

export default App