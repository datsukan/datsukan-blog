import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { Emoji } from "@components/emoji"
import { CreatedAtLabel } from "@components/article/datetime-label"
import { GoodBadge } from "@components/article/good-badge"
import { generateDiffLabel } from "@utils/datetime-diff"

export const ArticleListItem = ({ article }) => {
  return (
    <div className="group flex overflow-hidden bg-primary hover:bg-primary-hover">
      <Link to={`/${article.slug}`} itemProp="url">
        <div className="flex h-32 w-20 items-center justify-center group-hover:mix-blend-multiply">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
            <Emoji
              text={article.emoji}
              size="small"
              className="drop-shadow-xl"
            />
          </div>
        </div>
      </Link>
      <div className="flex-1 p-2.5">
        <div className="flex h-full flex-col justify-between px-2.5">
          <Link to={`/${article.slug}`} itemProp="url" className="mb-1 h-full">
            <h3 className="font-bold line-clamp-2">{article.title}</h3>
          </Link>
          <div>
            <div className="flex max-h-6 flex-wrap gap-2 overflow-hidden">
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
              <div className="flex gap-4">
                <CreatedAtLabel
                  createdAt={article.createdAt}
                  formattedCreatedAt={article.formattedCreatedAt}
                  createdAtFromNow={generateDiffLabel(article.createdAt)}
                  className="pt-2"
                />
                <GoodBadge className="pt-2.5" articleID={article.id} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
