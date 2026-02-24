import { useEffect, useState } from "react"
import { fetchGuests } from "../api"
import type { Guest } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

/* =======================
   Status Badge
======================= */
function StatusBadge({ status }: { status?: string }) {
  const normalized = status?.toLowerCase()

  const base =
    "inline-flex items-center justify-center min-w-[90px] h-8 px-3 text-xs font-semibold rounded-full transition-all duration-300"

  if (normalized === "yes") {
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        ✔ Hadir
      </span>
    )
  }

  if (normalized === "no") {
    return (
      <span className={`${base} bg-red-100 text-red-700`}>
        ✖ Tidak Hadir
      </span>
    )
  }

  return (
    <span className={`${base} bg-yellow-100 text-yellow-700`}>
      No Info
    </span>
  )
}

/* =======================
   Skeleton Row (Premium Shimmer)
======================= */
function SkeletonRow() {
  return (
    <tr className="h-14">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="p-3">
          <div className="h-4 rounded skeleton-shimmer"></div>
        </td>
      ))}
    </tr>
  )
}

/* =======================
   Error Banner
======================= */
function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-2xl flex items-center gap-3 animate-slideDown">
      <FontAwesomeIcon icon={faTriangleExclamation} />
      <span className="font-semibold">{message}</span>
    </div>
  )
}

/* =======================
   Undangan Page
======================= */
export default function Undangan() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await fetchGuests()

        if (!res.data.length) {
          throw new Error("Data kosong")
        }

        setGuests(res.data)
      } catch (err) {
        console.error(err)
        setError("Gagal mengambil data undangan.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filtered = guests
    .filter((g) => {
      if (filter === "hadir") return g.rsvp?.toLowerCase() === "yes"
      if (filter === "tidak") return g.rsvp?.toLowerCase() === "no"
      if (filter === "noinfo") return !g.rsvp
      return true
    })
    .filter((g) =>
      g.nama.toLowerCase().includes(search.toLowerCase()) || g.noUndangan.toString().includes(search)
    )
    .sort((a, b) => a.noUndangan - b.noUndangan)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">Daftar Undangan</h1>

      {error && <ErrorBanner message={error} />}

      <div className="flex flex-col md:flex-row gap-4">
        <input
          className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg w-full"
          placeholder="Cari nama atau nomor undangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="hadir">Hadir</option>
          <option value="tidak">Tidak Hadir</option>
          <option value="noinfo">Tanpa Info</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-3">No Undangan</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Valid For</th>
              <th className="p-3">RSVP</th>
              <th className="p-3">Person Hadir</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : (
              filtered.map((g) => (
                <tr
                  key={g.noUndangan}
                  className="h-14 border-b border-slate-200 dark:border-slate-700
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  transition-all duration-300 animate-fadeIn"
                >
                  <td className="p-3">{g.noUndangan}</td>
                  <td className="p-3">{g.nama}</td>
                  <td className="p-3">{g.person}</td>
                  <td className="text-center align-middle">
                    <StatusBadge status={g.rsvp} />
                  </td>
                  <td className="p-3">{g.attending}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}