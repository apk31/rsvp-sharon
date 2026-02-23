import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Undangan from "./pages/Undangan"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/undangan">Undangan</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/undangan" element={<Undangan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App