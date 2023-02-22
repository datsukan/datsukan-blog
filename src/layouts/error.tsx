import React, { ReactNode } from "react"
import { Header } from "@components/layout/Header"
import { Footer } from "@components/layout/Footer"
import { Hr } from "@components/Hr"

import "@styles/global.css"

type Props = {
  children: ReactNode
}

export const ErrorLayout = ({ children }: Props) => {
  const containerClass = "mx-2 max-w-screen-lg lg:mx-auto"

  return (
    <div className="flex min-h-screen flex-col font-body text-primary">
      {/* ヘッダー */}
      <div className="mb-5">
        <Header className={containerClass} />
      </div>

      {/* エラーメッセージ */}
      <div
        className={`flex flex-1 items-stretch justify-center ${containerClass}`}
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
