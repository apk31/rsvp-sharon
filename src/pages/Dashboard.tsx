import { useEffect, useState } from "react"
import { fetchGuests } from "../api"
import { Guest } from "../types"

export default function Dashboard() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [lastUpdate, setLastUpdate] = useState("")

  useEffect(() => {
    fetchGuests().then(res => {
      setGuests(res.data)
      setLastUpdate(res.lastUpdated)
    })
  }, [])

  const totalUndangan = guests.length
  const hadir = guests.filter(g => g.rsvp?.toLowerCase() === "yes")
  const tidakHadir = guests.filter(g => g.rsvp?.toLowerCase() === "no")
  const noInfo = guests.filter(g => !g.rsvp)

  const totalOrang = guests.reduce((acc, g) => acc + g.person, 0)
  const totalHadirOrang = guests.reduce((acc, g) => acc + g.attending, 0)

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Undangan</h3>
      <p>Total: {totalUndangan}</p>
      <p>Hadir: {hadir.length}</p>
      <p>Tidak Hadir: {tidakHadir.length}</p>
      <p>No Info: {noInfo.length}</p>

      <h3>Jumlah Orang</h3>
      <p>Total Orang Diundang: {totalOrang}</p>
      <p>Total Orang Hadir: {totalHadirOrang}</p>

      <p>Last Update: {lastUpdate}</p>
    </div>
  )
}