import * as React from "react"
import { Header } from "@components/layout/header"
import { Sidebar } from "@components/layout/sidebar"
import { Footer } from "@components/layout/footer"
import { Hr } from "@components/hr"

const Layout = ({ location, children }) => {
  const containerStyle = "mx-2 max-w-screen-lg lg:mx-auto"
  const isRootPath = location.pathname === "/"
  const flexCol = isRootPath ? "flex-col-reverse" : "flex-col"

  return (
    <div className="font-body text-primary flex flex-col min-h-screen">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerStyle} />
      </div>

      <div className={`flex-1 flex ${flexCol} md:flex-row ${containerStyle}`}>
        {/* コンテンツ */}
        <div>
          <main>{children}</main>
        </div>

        {/* サイドバー */}
        <div className="md:ml-10">
          <Hr className="mb-12 md:hidden" />
          <Sidebar isShowDetail={isRootPath} />
        </div>
      </div>

      {/* フッター */}
      <div className="mt-8">
        <Hr />
        <Footer className={containerStyle} />
      </div>
    </div>
  )
}

export default Layout
