import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"

type CreatedAtLabelProps = {
  className?: string
  createdAt: string
  formattedCreatedAt: string
  createdAtFromNow: string
}

export const CreatedAtLabel = ({
  className = "",
  createdAt,
  formattedCreatedAt,
  createdAtFromNow,
}: CreatedAtLabelProps) => {
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

type UpdatedAtLabelProps = {
  className?: string
  updatedAt: string
  formattedUpdatedAt: string
  updatedAtFromNow: string
}

export const UpdatedAtLabel = ({
  className = "",
  updatedAt,
  formattedUpdatedAt,
  updatedAtFromNow,
}: UpdatedAtLabelProps) => {
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
