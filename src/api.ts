import type { Guest } from "./types"
import Papa from "papaparse"

const SHEET_ID = "1lJjs9D8m7LWgQ0HA7SEWAkyIC572QR8SgqLD9CpTKF8"

const DATA_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`

interface CsvRow {
  [key: string]: string
}

export async function fetchGuests(): Promise<{
  data: Guest[]
  lastUpdated: string
}> {
  try {
    const timestamp = Date.now()

    const res = await fetch(`${DATA_URL}&_=${timestamp}`)
    const csvText = await res.text()

    const parsed = Papa.parse<CsvRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    const rows = parsed.data

    if (!rows.length) {
      return { data: [], lastUpdated: "-" }
    }

    const guests: Guest[] = rows.map((row) => ({
      no: Number(row["No"]) || 0,
      noUndangan: Number(row["No. Undangan"]) || 0,
      nama: row["Nama"] || "",
      person: Number(row["Person"]) || 0,
      grup: row["Grup/Meja"] || "",
      rsvp: (row["RSVP"] || "").toLowerCase(),
      noWhatsapp: row["No. WhatsApp"] || "",
      linkWa: row["Link WA"] || "",
      url: row["URL"] || "",
      qrCode: row["QR Code Number"] || "",
      attending: Number(row["Attending"]) || 0,
    }))

    // Ambil last_update dari baris pertama
    const lastUpdated =
      rows[0]["last_update"]?.replace(/^"+|"+$/g, "").trim() || "-"

    return {
      data: guests,
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