import dayjs from "dayjs"

// 投稿後の経過日時の表示を生成する
function generateDiffLabel(article) {
  const publishedAt = dayjs(article.publishedAt)
  const now = dayjs()

  const diffYears = now.diff(publishedAt, "year")
  const diffMonths = now.diff(publishedAt, "month")
  const diffWeeks = now.diff(publishedAt, "week")
  const diffDays = now.diff(publishedAt, "day")
  const diffHours = now.diff(publishedAt, "hour")
  const diffMinutes = now.diff(publishedAt, "minute")
  const diffSeconds = now.diff(publishedAt, "second")

  if (diffYears) return `${diffYears}年前`
  if (diffMonths) return `${diffMonths}ヶ月前`
  if (diffWeeks) return `${diffWeeks}週間前`
  if (diffDays) return `${diffDays}日前`
  if (diffHours) return `${diffHours}時間前`
  if (diffMinutes) return `${diffMinutes}分前`
  if (diffSeconds) return `${diffSeconds}秒前`
}

// 投稿してから1年が経過しているか判定する
function hasPassedOneYear(article) {
  const publishedAt = dayjs(article.publishedAt)
  const now = dayjs()
  const diffYears = now.diff(publishedAt, "year")

  return diffYears >= 1
}

export { generateDiffLabel, hasPassedOneYear }
