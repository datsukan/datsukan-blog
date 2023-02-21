/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import type { Article } from "@my-types/article"
import siteImage from "@images/default-ogp.png"

type Meta = Array<
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }
>

type Props = {
  title: string
  description?: string
  lang?: string
  meta?: Meta
  article?: Article
}

export const Seo = ({
  description,
  lang,
  meta = [],
  title,
  article,
}: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl
  const image = article
    ? `${process.env.GATSBY_OGP_IMAGE_API_BASE_URL}${article.title}.png?emoji=${article.emoji}&publishedAt=${article.formattedCreatedAt}`
    : null
  const defaultImage = `${siteUrl}${siteImage}`
  const siteTitle = !title ? defaultTitle : `${title} | ${defaultTitle}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: siteTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: "og:image",
          content: image || defaultImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: siteTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:site`,
          content: "@datsukan_tech",
        },
        {
          name: `twitter:image`,
          content: image || defaultImage,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
