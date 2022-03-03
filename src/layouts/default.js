import * as React from "react"
import { Header } from "@layouts/header"
import { Sidebar } from "@layouts/sidebar"
import { Footer } from "@layouts/footer"
import { Hr } from "@components/hr"

import "@css/global.css"

export const DefaultLayout = ({ location, children }) => {
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
        className={`flex-1 flex ${flexColClass} md:flex-row ${containerClass}`}
      >
        {/* コンテンツ */}
        <main className="w-full">{children}</main>

        {/* サイドバー */}
        <div className="ml-0 md:ml-10 mb-10">
          {!isArticleListPage(path) && <Hr className="mb-12 md:hidden" />}
          <Sidebar />
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
