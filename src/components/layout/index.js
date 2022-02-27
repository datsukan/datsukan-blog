import * as React from "react"
import { Header } from "@components/layout/header"
import { Sidebar } from "@components/layout/sidebar"
import { Footer } from "@components/layout/footer"
import { Hr } from "@components/hr"

const Layout = ({ location, children }) => {
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
        <div className="w-full">
          <main>{children}</main>
        </div>

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

export default Layout

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
