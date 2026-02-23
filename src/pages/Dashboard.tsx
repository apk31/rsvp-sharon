import { useEffect, useState } from "react"
import { fetchGuests } from "../api"
import type { Guest } from "../types"

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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Total Undangan" value={totalUndangan} />
        <Card title="Hadir" value={hadir.length} color="green" />
        <Card title="Tidak Hadir" value={tidakHadir.length} color="red" />
        <Card title="Tanpa Info" value={noInfo.length} color="yellow" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Total Orang Diundang" value={totalOrang} />
        <Card title="Total Orang Hadir" value={totalHadirOrang} color="green" />
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-800">
  Last Update: {lastUpdate}
</p>
    </div>
  )
}

function Card({ title, value, color }: any) {
  const colorMap: any = {
    green: "text-green-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
      <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${colorMap[color] || ""}`}>
        {value}
      </p>
    </div>
  )
}