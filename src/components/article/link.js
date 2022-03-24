import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { Emoji } from "@components/emoji"
import { CreatedAtLabel } from "@components/article/datetime-label"

export const ArticleLink = ({ article }) => {
  return (
    <div className="flex group ring-1 ring-tertiary rounded bg-primary hover:bg-primary-hover overflow-hidden">
      <Link to={`/${article.slug}`} itemProp="url">
        <div className="h-32 w-32 ring-1 ring-tertiary flex items-center justify-center group-hover:mix-blend-multiply">
          <Emoji text={article.emoji} size="small" className="drop-shadow-xl" />
        </div>
      </Link>
      <div className="flex-1 p-2.5">
        <div className="h-full px-2.5 flex flex-col justify-between">
          <Link to={`/${article.slug}`} itemProp="url" className="mb-1 h-full">
            <h3 className="font-bold line-clamp-2">{article.title}</h3>
          </Link>
          <div>
            <div className="max-h-6 flex flex-wrap gap-2 overflow-hidden">
              <CategoryBadge slug={article.category.slug}>
                {article.category.name}
              </CategoryBadge>
              {article.tags &&
                article.tags.map(tag => (
                  <TagBadge key={tag.slug} slug={tag.slug}>
                    {tag.name}
                  </TagBadge>
                ))}
            </div>
            <Link to={`/${article.slug}`} itemProp="url">
              <CreatedAtLabel
                createdAt={article.createdAt}
                formattedCreatedAt={article.formattedCreatedAt}
                createdAtFromNow={article.createdAtFromNow}
                className="pt-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
