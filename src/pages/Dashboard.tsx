import { useEffect, useState } from "react"

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 800
    const increment = value / (duration / 16)

    const counter = setInterval(() => {
      start += increment
      if (start >= value) {
        start = value
        clearInterval(counter)
      }
      setDisplay(Math.floor(start))
    }, 16)

    return () => clearInterval(counter)
  }, [value])

  return <span>{display}</span>
}
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
  <div className="max-w-6xl mx-auto p-6 pb-24 space-y-8">

    <h1 className="text-3xl md:text-4xl font-bold">
      Dashboard
    </h1>

    {/* ===== 4 CARD ATAS ===== */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Total Undangan" value={totalUndangan} />
      <Card title="Hadir" value={hadir.length} color="green" />
      <Card title="Tidak Hadir" value={tidakHadir.length} color="red" />
      <Card title="Tanpa Info" value={noInfo.length} color="yellow" />
    </div>

    {/* ===== 2 CARD BAWAH ===== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card title="Total Orang Diundang" value={totalOrang} />
      <Card title="Total Orang Hadir" value={totalHadirOrang} color="green" />
    </div>

    {/* ===== Footer Section ===== */}
    <div className="pt-6 border-t border-slate-300 dark:border-slate-700 space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Last Update with Invitation Site: {lastUpdate}
      </p>

      <a
        href="https://wa.me/+6287872568324"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 
                   bg-green-600 hover:bg-green-700 
                   text-white px-5 py-2 rounded-xl 
                   shadow-md transition-all duration-300"
      >
        💬 Hubungi CS RSVP
      </a>
    </div>

    {/* Floating WA (Mobile Only) */}
    <a
      href="https://wa.me/+6287872568324"
      target="_blank"
      className="fixed bottom-6 right-6 
                 bg-green-600 hover:bg-green-700 
                 text-white p-4 rounded-full 
                 shadow-lg transition-all duration-300 
                 sm:hidden"
    >
      💬
    </a>

  </div>
)
}

function Card({ title, value, color }: any) {
  const colorMap: any = {
    green: "text-green-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
  }

  return (
    <div className="
      bg-white dark:bg-slate-800
      min-h-[100px] md:min-h-[120px]
      rounded-2xl
      p-4 md:p-6
      shadow-md hover:shadow-lg
      transition-all duration-300
      active:scale-[0.98]
    ">
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {title}
      </p>

      <p className={`text-2xl md:text-3xl font-bold mt-2 ${colorMap[color] || ""}`}>
        <AnimatedNumber value={value} />
      </p>
    </div>
  )
}