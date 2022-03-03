import * as React from "react"
import { Header } from "@layouts/header"
import { Footer } from "@layouts/footer"
import { Hr } from "@components/hr"

import "@css/global.css"

export const ErrorLayout = ({ children }) => {
  const containerClass = "mx-2 max-w-screen-lg lg:mx-auto"

  return (
    <div className="font-body text-primary flex flex-col min-h-screen">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerClass} />
      </div>

      {/* エラーメッセージ */}
      <div
        className={`flex-1 flex justify-center items-stretch ${containerClass}`}
      >
        <main>{children}</main>
      </div>

      {/* フッター */}
      <div className="mt-8">
        <Hr />
        <Footer className={containerClass} />
      </div>
    </div>
  )
}
