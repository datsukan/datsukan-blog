import { ArticleLink } from "@components/article/link"
import { ArticleListItem } from "@components/article/list-item"

export const ArticlesBeforeAndAfter = ({ className = "", previous, next }) => {
  return (
    <nav className={className}>
      <p className="text-lg font-bold">前後の記事</p>
      <ul className="mt-6 hidden lg:grid grid-cols-1 gap-6">
        <li>{previous && <ArticleLink article={previous} />}</li>
        <li>{next && <ArticleLink article={next} />}</li>
      </ul>
      <ul className="mt-6 lg:hidden grid grid-cols-1 divide-y">
        <li>{previous && <ArticleListItem article={previous} />}</li>
        <li>{next && <ArticleListItem article={next} />}</li>
      </ul>
    </nav>
  )
}
