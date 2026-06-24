const MEM: Map<string, string> = new Map()
const TTL = 24 * 60 * 60 * 1000

interface Entry {
  dataUrl: string
  ts: number
}

function key(username: string) {
  return `skin_cache_${username.toLowerCase()}`
}

async function fetchAndStore(username: string): Promise<string> {
  const res = await fetch(`https://mc-heads.net/skin/${username}`)
  if (!res.ok) throw new Error(`skin fetch failed: ${res.status}`)
  const blob = await res.blob()
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
  try {
    localStorage.setItem(key(username), JSON.stringify({ dataUrl, ts: Date.now() } satisfies Entry))
  } catch {
    // localStorage full — skip persistence
  }
  MEM.set(username.toLowerCase(), dataUrl)
  return dataUrl
}

export async function getCachedSkin(username: string): Promise<string> {
  const k = username.toLowerCase()

  if (MEM.has(k)) return MEM.get(k)!

  try {
    const raw = localStorage.getItem(key(username))
    if (raw) {
      const entry: Entry = JSON.parse(raw)
      if (Date.now() - entry.ts < TTL) {
        MEM.set(k, entry.dataUrl)
        return entry.dataUrl
      }
    }
  } catch {
    // corrupted entry
  }

  return fetchAndStore(username)
}
