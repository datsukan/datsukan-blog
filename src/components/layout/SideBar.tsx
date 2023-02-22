import { Bio } from "@components/Bio"
import { Hr } from "@components/Hr"
import { Category } from "@components/Category"
import { Tags } from "@components/Tags"
import { TableOfContents } from "@components/article/TableOfContents"
import { AdsenseSquare } from "@components/adsense/Square"

import type { Article } from "@my-types/article"

type Props = {
  className?: string
  isArticlePage: boolean
  article?: Article
  path: string
}

export const SideBar = ({
  className = "",
  isArticlePage,
  article,
  path,
}: Props) => {
  return (
    <div className={`h-full w-full md:w-72 ${className}`}>
      <Bio />
      {!isArticlePage && (
        <>
          <Hr className="my-7" />
          <Category />
          <Hr className="my-7" />
          <Tags />
          <Hr className="my-7" />
          <AdsenseSquare path={path} />
        </>
      )}
      {isArticlePage && (
        <>
          <Hr className="my-7 hidden md:block" />
          <TableOfContents
            article={article}
            className="sticky top-20 hidden md:block"
          />
        </>
      )}
    </div>
  )
}
