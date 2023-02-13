import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { Emoji } from "@components/emoji"
import { CreatedAtLabel } from "@components/article/datetime-label"
import { GoodBadge } from "@components/article/good-badge"
import { CommentBadge } from "@components/article/comment-badge"
import { generateDiffLabel } from "@utils/datetime-diff"

export const ArticleCard = ({ article }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded bg-primary ring-1 ring-tertiary hover:bg-primary-hover">
      <CategoryBadge
        className="absolute top-2 left-2 z-10"
        slug={article.category.slug}
      >
        {article.category.name}
      </CategoryBadge>

      <div className="flex-1">
        <Link to={`/${article.slug}`} itemProp="url" className="block h-full">
          <div className="flex h-48 items-center justify-center border-b border-tertiary group-hover:mix-blend-multiply">
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
        <div className="flex max-h-14 flex-wrap gap-2 overflow-hidden">
          {article.tags &&
            article.tags.map(tag => (
              <TagBadge key={tag.name} slug={tag.slug}>
                {tag.name}
              </TagBadge>
            ))}
        </div>
        <Link to={`/${article.slug}`} itemProp="url">
          <div className="flex gap-4 pt-2.5">
            <CreatedAtLabel
              createdAt={article.createdAt}
              formattedCreatedAt={article.formattedCreatedAt}
              createdAtFromNow={generateDiffLabel(article.createdAt)}
            />
            <GoodBadge articleID={article.id} />
            <CommentBadge articleId={article.id} />
          </div>
        </Link>
      </div>
    </div>
  )
}
