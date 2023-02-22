import { ArticleLink } from "@components/article/Link"
import { ArticleListItem } from "@components/article/ListItem"

import type { Article } from "@my-types/article"

type Props = {
  className?: string
  previous?: Article
  next?: Article
}

export const ArticlesBeforeAndAfter = ({
  className = "",
  previous,
  next,
}: Props) => {
  return (
    <nav className={className}>
      <p className="text-lg font-bold">前後の記事</p>
      <ul className="mt-6 hidden grid-cols-1 gap-6 lg:grid">
        <li>{previous && <ArticleLink article={previous} />}</li>
        <li>{next && <ArticleLink article={next} />}</li>
      </ul>
      <ul className="mt-6 grid grid-cols-1 divide-y lg:hidden">
        <li>{previous && <ArticleListItem article={previous} />}</li>
        <li>{next && <ArticleListItem article={next} />}</li>
      </ul>
    </nav>
  )
}
