import { Guest } from "./types"

const SHEET_ID = "1lJjs9D8m7LWgQ0HA7SEWAkyIC572QR8SgqLD9CpTKF8"
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`

export async function fetchGuests(): Promise<{
  data: Guest[]
  lastUpdated: string
}> {
  const res = await fetch(URL)
  const text = await res.text()

  const json = JSON.parse(text.substring(47).slice(0, -2))

  const rows = json.table.rows

  const data: Guest[] = rows.map((row: any) => ({
    no: row.c[0]?.v || 0,
    noUndangan: row.c[1]?.v || 0,
    nama: row.c[2]?.v || "",
    person: row.c[3]?.v || 0,
    grup: row.c[4]?.v || "",
    rsvp: row.c[5]?.v || "",
    noWhatsapp: row.c[6]?.v || "",
    linkWa: row.c[7]?.v || "",
    url: row.c[8]?.v || "",
    qrCode: row.c[9]?.v || "",
    attending: row.c[10]?.v || 0,
  }))

  return {
    data,
    lastUpdated: json.table?.rows?.length
      ? new Date().toLocaleString()
      : "-"
  }
}