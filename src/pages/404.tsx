import * as React from "react"
import { Link } from "gatsby"

import { ErrorLayout } from "@layouts/error"
import { Seo } from "@components/Seo"

const NotFoundPage = () => {
  return (
    <ErrorLayout>
      <Seo title="404: Not Found" />
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">404: Not Found</h1>
        <p className="mt-4">お探しのページが存在しませんでした。</p>
        <Link to="/">
          <p className="mt-10 text-link hover:underline">記事一覧へ戻る</p>
        </Link>
      </div>
    </ErrorLayout>
  )
}

export default NotFoundPage
