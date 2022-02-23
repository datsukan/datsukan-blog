import { Link } from "gatsby"
import { CategoryBadge } from "@components/category-badge"

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
            <h3 className="font-bold">{article.title}</h3>
            <div className="mt-1">
              <div>
                <CategoryBadge>{article.category.label}</CategoryBadge>
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
