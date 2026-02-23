import type { Guest } from "./types"

const SHEET_ID = "1lJjs9D8m7LWgQ0HA7SEWAkyIC572QR8SgqLD9CpTKF8"

const DATA_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`
// const META_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&sheet=meta`

function parseCSV(text: string): string[][] {
  return text
    .trim()
    .split("\n")
    .map(row =>
      row
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(cell => cell.replace(/^"|"$/g, "").trim())
    )
}

export async function fetchGuests(): Promise<{
  data: Guest[]
  lastUpdated: string
}> {
  try {
    const timestamp = Date.now()

    // ===== FETCH GUEST LIST =====
    const res = await fetch(`${DATA_URL}&_=${timestamp}`)
    const csvText = await res.text()

    const rows = parseCSV(csvText)
    const header = rows[0]
const dataRows = rows.slice(1)

const getIndex = (name: string) =>
  header.findIndex(h => h.trim() === name.trim())
  
const data: Guest[] = dataRows.map(row => ({
  no: Number(row[getIndex("No")]) || 0,
  noUndangan: Number(row[getIndex("No. Undangan")]) || 0,
  nama: row[getIndex("Nama")] || "",
  person: Number(row[getIndex("Person")]) || 0,
  grup: row[getIndex("Grup/Meja")] || "",
  rsvp: row[getIndex("RSVP")] || "",
  noWhatsapp: row[getIndex("No. WhatsApp")] || "",
  linkWa: row[getIndex("Link WA")] || "",
  url: row[getIndex("URL")] || "",
  qrCode: row[getIndex("QR Code Number")] || "",
  attending: Number(row[getIndex("Attending")]) || 0,
}))
    // console.log("CSV TEXT:", csvText)
    // ===== FETCH META =====

    const lastUpdateIndex = getIndex("last_update")

const lastUpdated =
  lastUpdateIndex !== -1
    ? dataRows[0][lastUpdateIndex]
    : "-"

    return {
      data,
      lastUpdated,
    }

  } catch (error) {
    console.error("Fetch CSV error:", error)
    return {
      data: [],
      lastUpdated: "Error fetching data",
    }
  }
}