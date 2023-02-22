import { parseISO, formatDistanceToNow, differenceInYears } from "date-fns"
import type { Locale } from "date-fns"
import { ja } from "date-fns/locale"

// 経過日時のラベルを生成する
function generateDiffLabel(datetime: string): string {
  const d = parseISO(datetime)
  const locale: Locale = ja

  return formatDistanceToNow(d, { locale: locale }) + "前"
}

// 1年が経過しているか判定する
function hasPassedOneYear(datetime: string): boolean {
  return getNumberOfYearsPassed(datetime) >= 1
}

function getNumberOfYearsPassed(datetime: string): number {
  const d = parseISO(datetime)
  return differenceInYears(new Date(), d)
}

export { generateDiffLabel, hasPassedOneYear, getNumberOfYearsPassed }
