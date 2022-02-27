import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"

export const ArticleLink = ({ article }) => {
  return (
    <Link to={`/${article.id}`} itemProp="url">
      <div className="flex">
        <div className="h-24 w-24 bg-secondary border border-tertiary flex items-center justify-center rounded-xl overflow-hidden">
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
        <div className="flex-1">
          <div className="h-full px-2.5 flex flex-col justify-between">
            <h3 className="font-bold line-clamp-2">{article.title}</h3>
            <div className="mt-1">
              <div className="max-h-6 flex flex-wrap gap-2 overflow-hidden">
                <CategoryBadge name={article.category.name}>
                  {article.category.label}
                </CategoryBadge>
                {article.tags &&
                  article.tags.map(tag => (
                    <TagBadge key={tag.name} name={tag.name}>
                      {tag.label}
                    </TagBadge>
                  ))}
              </div>
              <p className="mt-1 text-xs text-secondary">
                {article.publishedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
