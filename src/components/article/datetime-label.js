import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"

export const CreatedAtLabel = ({
  className = "",
  createdAt,
  formattedCreatedAt,
  createdAtFromNow,
}) => {
  return (
    <p className={`text-xs text-secondary ${className}`}>
      <time dateTime={createdAt} className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faPen}
          width={12}
          height={12}
          className="inline-block h-3 w-3"
        />
        <p className="mt-0.5">
          {formattedCreatedAt} - {createdAtFromNow}
        </p>
      </time>
    </p>
  )
}

export const UpdatedAtLabel = ({
  className = "",
  updatedAt,
  formattedUpdatedAt,
  updatedAtFromNow,
}) => {
  return (
    <p className={`text-xs text-secondary ${className}`}>
      <time dateTime={updatedAt} className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faArrowsRotate}
          width={12}
          height={12}
          className="inline-block h-3 w-3"
        />
        <p className="mt-0.5">
          {formattedUpdatedAt} - {updatedAtFromNow}
        </p>
      </time>
    </p>
  )
}
