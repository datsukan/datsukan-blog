import React, { ReactNode } from "react"
import type { WindowLocation } from "reach__router"

import type { Article } from "@my-types/article"
import { Header } from "@components/layout/Header"
import { ReactionBar } from "@components/layout/ReactionBar"
import { SideBar } from "@components/layout/SideBar"
import { Footer } from "@components/layout/Footer"
import { Hr } from "@components/Hr"

import { currentURL } from "@utils/current-url"

import "@styles/global.css"

type Props = {
  location: WindowLocation
  children: ReactNode
  article?: Article
}

export const DefaultLayout = ({ location, children, article }: Props) => {
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
            className={`md:hidden ${!isArticlePage(path) ? "my-12" : "mb-12"}`}
          />
          <SideBar
            isArticlePage={isArticlePage(path)}
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

function isRootPage(path: string) {
  if (path === "/") {
    return true
  }
}

// 記事のページか判定する
function isArticlePage(path: string) {
  if (isRootPage(path)) {
    return false
  }

  if (!path.indexOf("/category/")) {
    return false
  }

  if (!path.indexOf("/tag/")) {
    return false
  }

  if (!path.indexOf("/about")) {
    return false
  }

  return true
}
