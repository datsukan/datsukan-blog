import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
library.add(faCircleUser as IconDefinition)

export const UserIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faCircleUser as IconDefinition}
      className="h-8 w-8 text-gray-400"
    />
  )
}
