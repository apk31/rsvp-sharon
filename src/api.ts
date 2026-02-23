import type { Guest } from "./types"

const SHEET_ID = "1lJjs9D8m7LWgQ0HA7SEWAkyIC572QR8SgqLD9CpTKF8"

const DATA_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&sheet=guestlist`
const META_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&sheet=meta`

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

    // Buang header
    const dataRows = rows.slice(1)

    const data: Guest[] = dataRows.map(row => ({
      no: Number(row[0]) || 0,
      noUndangan: Number(row[1]) || 0,
      nama: row[2] || "",
      person: Number(row[3]) || 0,
      grup: row[4] || "",
      rsvp: row[5] || "",
      noWhatsapp: row[6] || "",
      linkWa: row[7] || "",
      url: row[8] || "",
      qrCode: row[9] || "",
      attending: Number(row[10]) || 0,
    }))

    // ===== FETCH META =====
    const resMeta = await fetch(`${META_URL}&_=${timestamp}`)
    const metaText = await resMeta.text()

    const metaRows = parseCSV(metaText)

    const lastUpdated = metaRows?.[1]?.[0] || "-"

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