import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

type Props = {
  className?: string
  year?: number
}

export const PassedNYearCard = ({ className = "", year = 1 }: Props) => {
  return (
    <div className={`rounded-lg bg-amber-100 p-6 ${className}`}>
      <p className="text-center">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          width={14}
          height={14}
          className="inline-block text-amber-400"
        />
        <span className="ml-2 text-sm">
          この記事は投稿してから{year}年以上が経過しています。
        </span>
      </p>
    </div>
  )
}
