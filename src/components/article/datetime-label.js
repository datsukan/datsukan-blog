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
      <time dateTime={createdAt}>
        <FontAwesomeIcon
          icon={faPen}
          width={12}
          height={12}
          className="inline-block w-3 h-3"
        />
        <span className="ml-2">
          {formattedCreatedAt} - {createdAtFromNow}
        </span>
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
      <time dateTime={updatedAt}>
        <FontAwesomeIcon
          icon={faArrowsRotate}
          width={12}
          height={12}
          className="inline-block w-3 h-3"
        />
        <span className="ml-2">
          {formattedUpdatedAt} - {updatedAtFromNow}
        </span>
      </time>
    </p>
  )
}
