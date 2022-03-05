import { Bio } from "@components/bio"
import { Hr } from "@components/hr"
import { Category } from "@components/category"
import { Tags } from "@components/tags"
import { TableOfContents } from "@components/table-of-contents"

export const Sidebar = ({ className = "", isArticlePage, article }) => {
  return (
    <div className={`w-full md:w-72 h-full ${className}`}>
      <Bio />
      <Hr className="my-7" />
      <Category />
      <Hr className="my-7" />
      <Tags />
      {isArticlePage && (
        <>
          <Hr className="my-7" />
          <TableOfContents article={article} className="sticky top-20" />
        </>
      )}
    </div>
  )
}
