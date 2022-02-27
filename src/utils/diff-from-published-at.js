// 投稿後の経過日時の表示を生成する
function generateDiffLabel(article) {
  const {
    diffYearsPublishedAt,
    diffMonthsPublishedAt,
    diffWeeksPublishedAt,
    diffDaysPublishedAt,
    diffHoursPublishedAt,
    diffMinutesPublishedAt,
    diffSecondsPublishedAt,
  } = article

  if (isNotEmpty(diffYearsPublishedAt)) return `${diffYearsPublishedAt}年前`
  if (isNotEmpty(diffMonthsPublishedAt)) return `${diffMonthsPublishedAt}ヶ月前`
  if (isNotEmpty(diffWeeksPublishedAt)) return `${diffWeeksPublishedAt}週間前`
  if (isNotEmpty(diffDaysPublishedAt)) return `${diffDaysPublishedAt}日前`
  if (isNotEmpty(diffHoursPublishedAt)) return `${diffHoursPublishedAt}時間前`
  if (isNotEmpty(diffMinutesPublishedAt)) return `${diffMinutesPublishedAt}分前`
  if (isNotEmpty(diffSecondsPublishedAt)) return `${diffSecondsPublishedAt}秒前`
}

// 投稿してから1年が経過しているか判定する
function hasPassedOneYear(article) {
  const { diffYearsPublishedAt } = article

  return Number(diffYearsPublishedAt) >= 1
}

function isNotEmpty(value) {
  return !isEmpty(value)
}

function isEmpty(value) {
  if (!value) return true
  if (value === "0") return true

  return false
}

export { generateDiffLabel, hasPassedOneYear }
