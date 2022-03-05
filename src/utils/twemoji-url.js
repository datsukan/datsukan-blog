import twemoji from "twemoji"

export function twemojiURL(emoji) {
  const codePoint = twemoji.convert.toCodePoint(emoji)
  const baseUrl = "https://twemoji.maxcdn.com/v/latest/72x72/"
  const url = `${baseUrl}${codePoint.split("-")[0]}.png`

  return url
}
