import * as React from "react"

import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/seo"
import { ArticleCard } from "@components/article-card"

export const ArticlesLayout = props => {
  const { location, siteTitle, pageTitle, articles } = props

  if (articles.length === 0) {
    return (
      <DefaultLayout location={location} title={siteTitle}>
        <Seo title="" />
        <p>まだ投稿された記事がありません。</p>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout location={location} title={siteTitle}>
      <Seo title="" />

      {pageTitle && <h1 className="text-2xl font-bold mb-7">{pageTitle}</h1>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {articles.map(item => {
          const article = item.node

          return <ArticleCard article={article} key={article.id} />
        })}
      </div>
    </DefaultLayout>
  )
}
