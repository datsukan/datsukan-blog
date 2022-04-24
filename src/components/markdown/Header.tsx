import { ReactNode } from "react"

import { HeaderAnchorLink } from "@components/markdown/HeaderAnchorLink"

export type Props = {
  id: string
  depth: number
  children: ReactNode
}

export const Header = ({ id, depth, children }: Props) => {
  const Component = `h${depth}` as keyof JSX.IntrinsicElements
  return (
    <Component id={id} className="group relative -ml-6 pl-6">
      <HeaderAnchorLink
        id={id}
        className="invisible absolute top-1/2 -translate-y-1/2 -translate-x-7 group-hover:visible"
      />
      {children}
    </Component>
  )
}
