import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/${article.id}`} itemProp="url">
      <div className="border border-tertiary rounded-xl h-full overflow-hidden flex flex-col">
        <div className="flex-1">
          <div className="h-32 bg-secondary flex items-center justify-center relative">
            <CategoryBadge className="absolute top-2 left-2">
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
            <h2 className="text-sm font-bold">{article.title}</h2>
          </div>
        </div>
        <div className="p-2.5">
          <p className="text-xs text-secondary">{article.publishedAt}</p>
        </div>
      </div>
    </Link>
  )
}
