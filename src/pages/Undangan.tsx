import { useEffect, useState } from "react"
import { fetchGuests } from "../api"
import { Guest } from "../types"

export default function Undangan() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchGuests().then(res => setGuests(res.data))
  }, [])

  const filtered = guests
    .filter(g => {
      if (filter === "hadir") return g.rsvp?.toLowerCase() === "yes"
      if (filter === "tidak") return g.rsvp?.toLowerCase() === "no"
      if (filter === "noinfo") return !g.rsvp
      return true
    })
    .filter(g =>
      g.nama.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.no - b.no)

  return (
    <div>
      <h1>Daftar Undangan</h1>

      <input
        placeholder="Cari nama..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">Semua</option>
        <option value="hadir">Hadir</option>
        <option value="tidak">Tidak Hadir</option>
        <option value="noinfo">Tanpa Info</option>
      </select>

      <table border={1}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Person</th>
            <th>RSVP</th>
            <th>Attending</th>
            <th>WA</th>
            <th>Undangan</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(g => (
            <tr key={g.no}>
              <td>{g.no}</td>
              <td>{g.nama}</td>
              <td>{g.person}</td>
              <td>{g.rsvp}</td>
              <td>{g.attending}</td>

              <td>
                {g.linkWa ? (
                  <a href={g.linkWa} target="_blank">
                    <button>WA</button>
                  </a>
                ) : (
                  <button disabled>WA</button>
                )}
              </td>

              <td>
                {g.url ? (
                  <a href={g.url} target="_blank">
                    <button>Open</button>
                  </a>
                ) : (
                  <button disabled>Open</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}