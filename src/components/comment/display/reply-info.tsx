import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-regular-svg-icons"
library.add(faComment as IconDefinition)

type Props = {
  amount: number
  onClick: Function
}

export const ReplyInfo = ({ amount, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="flex cursor-pointer items-center gap-2 text-gray-400 hover:text-gray-600"
    >
      <FontAwesomeIcon icon={faComment as IconDefinition} className="h-5 w-5" />
      <span className="text-xs">{amount}</span>
    </button>
  )
}
