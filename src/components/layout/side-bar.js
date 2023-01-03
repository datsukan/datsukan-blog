import { Bio } from "@components/bio"
import { Hr } from "@components/hr"
import { Category } from "@components/category"
import { Tags } from "@components/tags"
import { TableOfContents } from "@components/article/table-of-contents"
import { Adsense } from "@components/adsense"

export const SideBar = ({ className = "", isArticlePage, article, path }) => {
  return (
    <div className={`h-full w-full md:w-72 ${className}`}>
      <Bio />
      {!isArticlePage && (
        <>
          <Hr className="my-7" />
          <Category />
          <Hr className="my-7" />
          <Tags />
        </>
      )}
      <Hr className="my-7" />
      {isArticlePage && (
        <TableOfContents
          article={article}
          className="sticky top-20 hidden md:block"
        />
      )}
      <Adsense path={path} />
    </div>
  )
}
