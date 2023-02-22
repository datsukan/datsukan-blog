import * as React from "react"
import type { WindowLocation } from "reach__router"

import type { Article } from "@my-types/article"
import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/Seo"
import { ArticleCard } from "@components/article/Card"
import { ArticleListItem } from "@components/article/ListItem"

type Props = {
  location: WindowLocation
  pageTitle?: string
  articles: Article[]
}

export const ArticlesLayout = ({
  location,
  pageTitle = "",
  articles,
}: Props) => {
  if (articles.length === 0) {
    return (
      <DefaultLayout location={location}>
        <Seo title="" />
        {pageTitle && <h1 className="mb-7 text-2xl font-bold">{pageTitle}</h1>}
        <p>まだ投稿された記事がありません。</p>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout location={location}>
      <Seo title="" />

      {pageTitle && <h1 className="mb-7 text-2xl font-bold">{pageTitle}</h1>}
      <div className="hidden grid-cols-1 gap-7 lg:grid lg:grid-cols-2">
        {articles.map(article => {
          return <ArticleCard article={article} key={article.id} />
        })}
      </div>
      <div className="flex flex-col divide-y lg:hidden">
        {articles.map(article => {
          return <ArticleListItem article={article} key={article.id} />
        })}
      </div>
    </DefaultLayout>
  )
}
