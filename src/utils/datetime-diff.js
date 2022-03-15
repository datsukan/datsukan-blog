import dayjs from "dayjs"

// 経過日時のラベルを生成する
function generateDiffLabel(datetime) {
  const now = dayjs()

  const diffYears = now.diff(datetime, "year")
  const diffMonths = now.diff(datetime, "month")
  const diffWeeks = now.diff(datetime, "week")
  const diffDays = now.diff(datetime, "day")
  const diffHours = now.diff(datetime, "hour")
  const diffMinutes = now.diff(datetime, "minute")
  const diffSeconds = now.diff(datetime, "second")

  if (diffYears) return `${diffYears}年前`
  if (diffMonths) return `${diffMonths}ヶ月前`
  if (diffWeeks) return `${diffWeeks}週間前`
  if (diffDays) return `${diffDays}日前`
  if (diffHours) return `${diffHours}時間前`
  if (diffMinutes) return `${diffMinutes}分前`
  if (diffSeconds) return `${diffSeconds}秒前`
}

// 1年が経過しているか判定する
function hasPassedOneYear(datetime) {
  const now = dayjs()
  const diffYears = now.diff(datetime, "year")

  return diffYears >= 1
}

export { generateDiffLabel, hasPassedOneYear }
