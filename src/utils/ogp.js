import axios from "axios"
import * as cheerio from "cheerio"

export async function getLinkCardOgpInfo(url) {
  const ogp = await getOgp(url)

  if (!ogp) return null
  if (!"og:title" in ogp || !ogp["og:title"]) return null
  if (!"og:url" in ogp || !ogp["og:url"]) return null
  if (!"og:site_name" in ogp || !ogp["og:site_name"]) return null
  if (!"og:image" in ogp || !ogp["og:image"]) return null

  const linkCardInfo = {
    title: ogp["og:title"],
    description: ogp["og:description"] ?? "",
    siteUrl: ogp["og:url"],
    siteName: ogp["og:site_name"],
    image: ogp["og:image"],
  }

  return linkCardInfo
}

export async function getOgp(url) {
  const encodedUri = encodeURI(url)
  const headers = { "User-Agent": "bot" }

  try {
    const res = await axios.get(encodedUri, { headers: headers })
    const html = res.data
    const $ = cheerio.load(html)
    const meta = $("meta").get()
    const ogp = extractOgp(meta)

    return ogp
  } catch (error) {
    console.error(error)
    return null
  }
}

// HTMLのmetaタグからogpを抽出
function extractOgp(metaElements) {
  let ogp = null
  metaElements.map(meta => {
    if (meta.attribs && meta.attribs.property && meta.attribs.content) {
      ogp[meta.attribs.property] = meta.attribs.content
    }
  })

  return ogp
}
