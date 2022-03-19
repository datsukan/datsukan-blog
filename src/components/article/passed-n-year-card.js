import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

export const PassedNYearCard = ({ className = "", year = 1 }) => {
  return (
    <div className={`p-6 bg-amber-100 rounded-lg ${className}`}>
      <p className="text-center">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          width={14}
          height={14}
          className="text-amber-400 inline-block"
        />
        <span className="ml-2 text-sm">
          この記事は投稿してから{year}年以上が経過しています。
        </span>
      </p>
    </div>
  )
}
