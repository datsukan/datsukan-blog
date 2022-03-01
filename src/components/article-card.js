import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { generateDiffLabel } from "@utils/diff-from-published-at"

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/${article.id}`} itemProp="url">
      <div className="ring-1 ring-tertiary rounded-lg h-full overflow-hidden flex flex-col transition hover:ring-4">
        <div className="flex-1">
          <div className="h-48 bg-secondary flex items-center justify-center relative">
            <CategoryBadge
              className="absolute top-2 left-2"
              name={article.category.name}
            >
              {article.category.label}
            </CategoryBadge>

            {(() => {
              if (article.featuredImage) {
                return (
                  <img
                    src={article.featuredImage.url}
                    className="w-full h-full object-cover"
                  />
                )
              } else {
                return (
                  <span className="text-secondary font-semibold">No image</span>
                )
              }
            })()}
          </div>
          <div className="p-2.5">
            <h2 className="text-md font-bold line-clamp-3">{article.title}</h2>
          </div>
        </div>
        <div className="p-2.5">
          <div className="max-h-14 flex flex-wrap gap-2 overflow-hidden">
            {article.tags &&
              article.tags.map(tag => (
                <TagBadge key={tag.name} name={tag.name}>
                  {tag.label}
                </TagBadge>
              ))}
          </div>
          <p className="mt-2.5 text-xs text-secondary">
            {article.formattedPublishedAt} - {generateDiffLabel(article)}
          </p>
        </div>
      </div>
    </Link>
  )
}
