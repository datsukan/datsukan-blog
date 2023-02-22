import { UserIcon } from "@components/comment/Display/UserIcon"
import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
library.add(faLink as IconDefinition)

type Props = {
  id: string
  name: string
  createdAt: string
}

export const CommentInfo = ({ id, name, createdAt }: Props) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <UserIcon />
        <span className="text-sm font-bold">{name}</span>
        <span className="text-xs text-gray-500">{createdAt}</span>
      </div>
      <a
        href={`#${id}`}
        className="rounded-full p-2 text-gray-400 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-600"
      >
        <FontAwesomeIcon
          icon={faLink as IconDefinition}
          className="block h-4 w-4"
        />
      </a>
    </div>
  )
}
