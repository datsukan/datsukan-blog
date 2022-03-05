import { useStaticQuery, graphql } from "gatsby"

export function currentURL(location) {
  const path = location.pathname
  const siteUrl = getSiteUrl()
  const href = !path ? siteUrl : `${siteUrl}${path}`

  // 末尾のスラッシュを削除したURLを返す
  const lastString = href.slice(-1)
  if (lastString === "/") return href.slice(0, -1)

  return href
}

function getSiteUrl() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)
  return data.site.siteMetadata?.siteUrl
}
