import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"

const Title = ({ className = "", title }) => {
  return (
    <span
      className={`py-1.5 px-3 text-white text-xs bg-slate-600 rounded-md rounded-b-none ${className}`}
    >
      {title}
    </span>
  )
}

const CopyButton = ({ className = "", text }) => {
  const [isInvisible, setIsInvisible] = useState(true)

  const copyToClipboard = copyText => {
    navigator.clipboard.writeText(copyText)
    if (!isInvisible) return

    setIsInvisible(false)
    setTimeout(() => setIsInvisible(true), 3000)
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => copyToClipboard(text)}
        className={`block relative p-2 rounded-md bg-white/20 hover:bg-white/40`}
      >
        <span
          role="tooltip"
          className={`
            absolute
            right-0
            -translate-y-12
            z-10
            py-1
            px-2
            text-xs
            font-medium
            text-white
            bg-gray-800
            rounded-lg
            shadow-sm
            transition-opacity
            duration-300
            ${isInvisible ? "invisible opacity-0" : "opacity-90"}
          `}
        >
          コピーしました
        </span>

        <FontAwesomeIcon
          icon={faCopy}
          width={16}
          height={16}
          className="block w-4 h-4"
        />
      </button>
    </div>
  )
}

export { Title, CopyButton }
