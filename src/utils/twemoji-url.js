import twemoji from "twemoji"

export function twemojiURL(emoji) {
  const codePoint = twemoji.convert.toCodePoint(emoji)
  const baseUrl = "https://twemoji.maxcdn.com/v/latest/svg/"
  const url = `${baseUrl}${codePoint.split("-")[0]}.svg`

  return url
}
