import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
library.add(faSpinner as IconDefinition)

type Props = {
  label: string
  post: Function
  isLoading: boolean
}

export const PostButton = ({ label, post, isLoading }: Props) => {
  return (
    <button
      type="button"
      onClick={() => post()}
      className={`relative rounded-lg bg-blue-400 px-3 py-2 hover:bg-blue-500 ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <FontAwesomeIcon
          icon={faSpinner as IconDefinition}
          className={`h-5 w-5 animate-spin text-white ${
            isLoading ? "" : "opacity-0"
          }`}
        />
      </div>
      <span
        className={`text-sm font-bold text-white ${
          isLoading ? "opacity-0" : ""
        }`}
      >
        {label}
      </span>
    </button>
  )
}
