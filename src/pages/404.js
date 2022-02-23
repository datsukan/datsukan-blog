import * as React from "react"
import { Link, graphql } from "gatsby"

import { ErrorLayout } from "@components/layout/error"
import Seo from "@components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <ErrorLayout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <div className="h-full flex flex-col justify-center items-center">
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
