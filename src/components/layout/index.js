import * as React from "react"
import { Header } from "@components/layout/header"
import { Sidebar } from "@components/layout/sidebar"
import { Footer } from "@components/layout/footer"
import { Hr } from "@components/hr"

const Layout = ({ children }) => {
  const containerStyle = "mx-2 max-w-screen-lg lg:mx-auto"

  return (
    <div className="font-body text-primary flex flex-col min-h-screen">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerStyle} />
      </div>

      <div className={`flex-1 flex ${containerStyle}`}>
        {/* コンテンツ */}
        <div>
          <main>{children}</main>
        </div>

        {/* サイドバー */}
        <div className="ml-10">
          <Sidebar />
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
