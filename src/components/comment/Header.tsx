import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments } from "@fortawesome/free-regular-svg-icons"
library.add(faComments as IconDefinition)

export const Header = () => {
  return (
    <div className="flex content-center justify-center gap-3 border-b border-gray-200 p-4">
      <FontAwesomeIcon
        icon={faComments as IconDefinition}
        className="h-6 w-6"
      />
      <span className="text-lg font-bold">コメント</span>
    </div>
  )
}
