import { ArticleLink } from "@components/article-link"

export const ArticlesBeforeAndAfter = ({ className = "", previous, next }) => {
  return (
    <nav className={className}>
      <p className="text-lg font-bold">前後の記事</p>
      <ul className="mt-6 grid grid-cols-1 gap-6">
        <li>{previous && <ArticleLink article={previous} />}</li>
        <li>{next && <ArticleLink article={next} />}</li>
      </ul>
    </nav>
  )
}
