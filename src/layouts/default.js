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
    <div className="font-body text-primary flex flex-col min-h-screen px-2">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerClass} isRootPage={isRootPage(path)} />
      </div>

      <div
        className={`flex-1 relative flex flex-col md:flex-row ${containerClass}`}
      >
        {/* リアクションバー */}
        {article && (
          <div className="hidden xl:block absolute -left-28 h-full pt-72">
            <ReactionBar
              className="sticky top-20"
              url={url}
              articleID={article.id}
            />
          </div>
        )}

        {/* コンテンツ */}
        <main className="flex-1 min-w-0">{children}</main>

        {/* サイドバー */}
        <div className="ml-0 md:ml-10 mb-10">
          <Hr
            className={`md:hidden ${
              isArticleListPage(path) ? "my-12" : "mb-12"
            }`}
          />
          <SideBar isArticlePage={!isArticleListPage(path)} article={article} />
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
