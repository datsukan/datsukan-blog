import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"

export const CreatedAtLabel = ({
  className = "",
  createdAt,
  formattedCreatedAt,
  createdAtFromNow,
}) => {
  return (
    <div className={`text-xs text-secondary ${className}`}>
      <time dateTime={createdAt} className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faPen}
          width={12}
          height={12}
          className="inline-block h-3 w-3"
        />
        <div className="mt-0.5">
          {formattedCreatedAt} - {createdAtFromNow}
        </div>
      </time>
    </div>
  )
}

export const UpdatedAtLabel = ({
  className = "",
  updatedAt,
  formattedUpdatedAt,
  updatedAtFromNow,
}) => {
  return (
    <div className={`text-xs text-secondary ${className}`}>
      <time dateTime={updatedAt} className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faArrowsRotate}
          width={12}
          height={12}
          className="inline-block h-3 w-3"
        />
        <div className="mt-0.5">
          {formattedUpdatedAt} - {updatedAtFromNow}
        </div>
      </time>
    </div>
  )
}
