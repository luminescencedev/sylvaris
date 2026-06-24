const MEM: Map<string, string> = new Map()

export async function getCachedSkin(username: string): Promise<string> {
  const k = username.toLowerCase()
  if (MEM.has(k)) return MEM.get(k)!
  const url = `https://minotar.net/skin/${username}`
  MEM.set(k, url)
  return url
}
