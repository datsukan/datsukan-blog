import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleInfo,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons"

export const InfoMessage = ({ children, className = "" }) => {
  return (
    <div
      className={`p-4 rounded-md bg-blue-100 flex items-center gap-3 ${className}`}
    >
      <FontAwesomeIcon
        icon={faCircleInfo}
        width={16}
        height={16}
        className="inline w-5 h-5 text-blue-500"
      />

      <div>{children}</div>
    </div>
  )
}

export const WarnMessage = ({ children, className = "" }) => {
  return (
    <div
      className={`p-4 rounded-md bg-yellow-100 flex items-center gap-3 ${className}`}
    >
      <FontAwesomeIcon
        icon={faCircleExclamation}
        width={16}
        height={16}
        className="inline w-5 h-5 text-yellow-500"
      />

      <div>{children}</div>
    </div>
  )
}

export const AlertMessage = ({ children, className = "" }) => {
  return (
    <div
      className={`p-4 rounded-md bg-red-100 flex items-center gap-3 ${className}`}
    >
      <FontAwesomeIcon
        icon={faCircleXmark}
        width={16}
        height={16}
        className="inline w-5 h-5 text-red-500"
      />

      <div>{children}</div>
    </div>
  )
}
