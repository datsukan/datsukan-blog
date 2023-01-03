import * as React from "react"
import { Header } from "@components/layout/header"
import { ReactionBar } from "@components/layout/reaction-bar"
import { SideBar } from "@components/layout/side-bar"
import { Footer } from "@components/layout/footer"
import { Hr } from "@components/hr"

import { currentURL } from "@utils/current-url"

import "@css/global.css"

export const DefaultLayout = ({ location, children, article }) => {
  const path = location.pathname
  const url = currentURL(location)
  const containerClass = "max-w-screen-lg lg:mx-auto w-full"

  return (
    <div className="flex min-h-screen flex-col px-2 font-body text-primary">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerClass} isRootPage={isRootPage(path)} />
      </div>

      <div
        className={`relative flex flex-1 flex-col md:flex-row ${containerClass}`}
      >
        {/* リアクションバー */}
        {article && (
          <div className="absolute -left-28 hidden h-full pt-72 xl:block">
            <ReactionBar
              className="sticky top-20"
              url={url}
              articleID={article.id}
            />
          </div>
        )}

        {/* コンテンツ */}
        <main className="min-w-0 flex-1">{children}</main>

        {/* サイドバー */}
        <div className="ml-0 mb-10 md:ml-10">
          <Hr
            className={`md:hidden ${
              isArticleListPage(path) ? "my-12" : "mb-12"
            }`}
          />
          <SideBar
            isArticlePage={!isArticleListPage(path)}
            article={article}
            path={path}
          />
        </div>
      </div>

      {/* フッター */}
      <div className="mt-8">
        <Hr />
        <Footer className={containerClass} />
      </div>
    </div>
  )
}

function isRootPage(path) {
  if (path === "/") {
    return true
  }
}

// 記事の一覧ページか判定する
function isArticleListPage(path) {
  if (isRootPage(path)) {
    return true
  }

  if (!path.indexOf("/category/")) {
    return true
  }

  if (!path.indexOf("/tag/")) {
    return true
  }

  return false
}
