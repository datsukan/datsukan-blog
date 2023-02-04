import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { ReactElement } from "rehype-react/lib"

type Props = {
  className?: string
  url: string
}

export const UrlCopyButton = ({ className = "", url }: Props) => {
  if (!url) return null

  const [tooltipShown, setTooltipShown] = useState(false)
  const [tooltipShowReqCount, setTooltipShowCount] = useState(0)

  const showTooltip = () => {
    setTooltipShown(true)
    setTooltipShowCount(tooltipShowReqCount + 1)
    window.setTimeout(() => hideTooltip(), 3000)
  }

  const hideTooltip = () => {
    if (tooltipShowReqCount <= 0) {
      setTooltipShowCount(tooltipShowReqCount - 1)
    }

    if (tooltipShowReqCount === 0) {
      setTooltipShown(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(url)
    showTooltip()
  }

  return (
    <div
      className={`group relative h-16 w-16 p-2 drop-shadow ${className}`}
      onClick={() => copy()}
    >
      <Tooltip label="URLをコピーしました" show={tooltipShown}>
        <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-full outline outline-1 outline-slate-200 hover:bg-primary-hover">
          <FontAwesomeIcon icon={faLink} className="h-5 w-5" />
        </div>
      </Tooltip>
    </div>
  )
}

type TooltipProps = {
  children: ReactElement
  label: string
  show: boolean
}
const Tooltip = ({ children, label, show }: TooltipProps) => {
  const box =
    "whitespace-nowrap rounded bg-slate-700 px-2 py-1 text-white text-xs "
  const position = "absolute top-14 left-1/2 -translate-x-1/2 "
  const triangle =
    "before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:bottom-full before:border-4 before:border-transparent before:border-b-slate-700 "
  const animation = "transition pointer-events-none "
  return (
    <span className="relative">
      <span
        className={
          box + position + triangle + animation + (show ? "" : "opacity-0")
        }
      >
        {label}
      </span>
      {children}
    </span>
  )
}
