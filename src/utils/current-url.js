export function currentURL(location) {
  const hash = location.hash
  const href = location.href

  if (hash === "") {
    // 末尾のスラッシュを削除したURLを返す
    const lastString = href.slice(-1)
    if (lastString === "/") return href.slice(0, -1)

    return href
  }

  // アンカーを削除したURLを返す
  return href.replace(`/${hash}`, "")
}
