import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { Emoji } from "@components/emoji"
import { CreatedAtLabel } from "@components/article/datetime-label"
import { generateDiffLabel } from "@utils/datetime-diff"

export const ArticleCard = ({ article }) => {
  return (
    <div className="group ring-1 ring-tertiary rounded h-full overflow-hidden bg-primary hover:bg-primary-hover flex flex-col relative">
      <CategoryBadge
        className="absolute top-2 left-2 z-10"
        slug={article.category.slug}
      >
        {article.category.name}
      </CategoryBadge>

      <div className="flex-1">
        <Link to={`/${article.slug}`} itemProp="url" className="block h-full">
          <div className="h-48 border-b border-tertiary flex items-center justify-center group-hover:mix-blend-multiply">
            <Emoji
              text={article.emoji}
              size="medium"
              className="drop-shadow-xl"
            />
          </div>
          <div className="p-2.5">
            <h2 className="text-md font-bold line-clamp-3">{article.title}</h2>
          </div>
        </Link>
      </div>
      <div className="p-2.5">
        <div className="max-h-14 flex flex-wrap gap-2 overflow-hidden">
          {article.tags &&
            article.tags.map(tag => (
              <TagBadge key={tag.name} slug={tag.slug}>
                {tag.name}
              </TagBadge>
            ))}
        </div>
        <Link to={`/${article.slug}`} itemProp="url">
          <CreatedAtLabel
            createdAt={article.createdAt}
            formattedCreatedAt={article.formattedCreatedAt}
            createdAtFromNow={generateDiffLabel(article.createdAt)}
            className="pt-2.5"
          />
        </Link>
      </div>
    </div>
  )
}
