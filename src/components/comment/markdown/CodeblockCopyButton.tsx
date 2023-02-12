import { useState } from "react"

import { DuplicateIcon } from "@heroicons/react/outline"

export type Props = {
  className: string
  text: string
}

export const CodeblockCopyButton = ({ className = "", text }: Props) => {
  const [isInvisible, setIsInvisible] = useState(true)

  const copyToClipboard = (copyText: string) => {
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
        className={`relative block rounded-md bg-white/20 p-2 text-white hover:bg-white/40`}
      >
        <span
          role="tooltip"
          className={`
            transition-opacity
            absolute
            right-0
            z-10
            w-[100px]
            -translate-y-12
            rounded-lg
            bg-gray-800
            py-1
            px-2
            text-xs
            font-medium
            text-white
            shadow-sm
            duration-300
            ${isInvisible ? "invisible opacity-0" : "opacity-90"}
          `}
        >
          コピーしました
        </span>

        <DuplicateIcon className="block h-4 w-4" />
      </button>
    </div>
  )
}
