import * as React from "react"
import { Header } from "@layouts/header"
import { ReactionBar } from "@layouts/reaction-bar"
import { SideBar } from "@layouts/side-bar"
import { Footer } from "@layouts/footer"
import { Hr } from "@components/hr"

import "@css/global.css"

export const DefaultLayout = ({ location, children, article }) => {
  const path = location.pathname
  const containerClass = "max-w-screen-lg lg:mx-auto w-full"
  const flexColClass = isArticleListPage(path) ? "flex-col-reverse" : "flex-col"

  return (
    <div className="font-body text-primary flex flex-col min-h-screen px-2">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerClass} isRootPage={isRootPage(path)} />
      </div>

      <div
        className={`flex-1 relative flex ${flexColClass} md:flex-row ${containerClass}`}
      >
        {/* リアクションバー */}
        {!isRootPage(path) && (
          <div className="hidden xl:block absolute -left-24 h-full pt-72">
            <ReactionBar className="sticky top-20" articleID={article.id} />
          </div>
        )}

        {/* コンテンツ */}
        <main className="w-full">{children}</main>

        {/* サイドバー */}
        <div className="ml-0 md:ml-10 mb-10">
          {!isArticleListPage(path) && <Hr className="mb-12 md:hidden" />}
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

  return false
}
