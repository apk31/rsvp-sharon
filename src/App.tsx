import { HashRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Undangan from "./pages/Undangan"

function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/undangan">Undangan</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/undangan" element={<Undangan />} />
      </Routes>
    </HashRouter>
  )
}

export default App