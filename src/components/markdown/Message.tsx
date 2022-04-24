import { ReactNode } from "react"

import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/solid"

const baseClass = {
  block: "message-block flex items-center gap-4 rounded-md p-4",
  icon: "h-5 w-5",
}

export type Props = {
  children: ReactNode
  className?: string
}

export const NormalMessage = ({ children, className = "" }: Props) => {
  return (
    <div className={`bg-gray-100 ${baseClass.block} ${className}`}>
      <DotsCircleHorizontalIcon className={`text-gray-500 ${baseClass.icon}`} />
      <div className="w-full">{children}</div>
    </div>
  )
}

export const InfoMessage = ({ children, className = "" }: Props) => {
  return (
    <div className={`bg-blue-100 ${baseClass.block} ${className}`}>
      <InformationCircleIcon className={`text-blue-500 ${baseClass.icon}`} />
      <div className="w-full">{children}</div>
    </div>
  )
}

export const WarnMessage = ({ children, className = "" }: Props) => {
  return (
    <div className={`bg-yellow-100 ${baseClass.block} ${className}`}>
      <ExclamationCircleIcon className={`text-yellow-500 ${baseClass.icon}`} />
      <div className="w-full">{children}</div>
    </div>
  )
}

export const AlertMessage = ({ children, className = "" }: Props) => {
  return (
    <div className={`bg-red-100 ${baseClass.block} ${className}`}>
      <XCircleIcon className={`text-red-500  ${baseClass.icon}`} />
      <div className="w-full">{children}</div>
    </div>
  )
}
