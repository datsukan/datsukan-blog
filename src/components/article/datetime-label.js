import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { generateDiffLabel } from "@utils/datetime-diff"

export const PublishedAtLabel = ({
  className = "",
  publishedAt,
  formattedPublishedAt,
}) => {
  return (
    <p className={`text-xs text-secondary ${className}`}>
      <time dateTime={publishedAt}>
        <FontAwesomeIcon
          icon={faPen}
          width={12}
          height={12}
          className="inline-block w-3 h-3"
        />
        <span className="ml-2">
          {formattedPublishedAt} - {generateDiffLabel(publishedAt)}
        </span>
      </time>
    </p>
  )
}

export const UpdatedAtLabel = ({
  className = "",
  updatedAt,
  formattedUpdatedAt,
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
          {formattedUpdatedAt} - {generateDiffLabel(updatedAt)}
        </span>
      </time>
    </p>
  )
}
