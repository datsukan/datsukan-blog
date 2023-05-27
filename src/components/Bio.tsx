/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { differenceInYears, parse } from "date-fns"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { LinkCard } from "@components/LinkCard"
import { SiteAboutLink } from "@components/SiteAboutLink"

export const Bio = () => {
  // サイトのメタ情報を取得する
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
      myWebsiteFile: file(relativePath: { eq: "bio/my-website.svg" }) {
        publicURL
      }
      emailFile: file(relativePath: { eq: "bio/gmail.svg" }) {
        publicURL
      }
      twitterFile: file(relativePath: { eq: "bio/twitter.svg" }) {
        publicURL
      }
    }
  `)
  const author = data.site.siteMetadata?.author

  // リンク情報の配列を生成する
  const links = [
    {
      label: "My web site",
      image: data.myWebsiteFile.publicURL,
      linkUrl: "https://datsukan.me/",
    },
    {
      label: "Email",
      image: data.emailFile.publicURL,
      linkUrl: "mailto:s.datsukan@gmail.com",
    },
    {
      label: "Twitter",
      image: data.twitterFile.publicURL,
      linkUrl: "https://twitter.com/datsukan_tech",
    },
  ]

  const avatarSize = 95

  const calculateAge = (birthDateString: string): number => {
    const birthDate = parse(birthDateString, "yyyy-MM-dd", new Date())
    const currentDate = new Date()
    return differenceInYears(currentDate, birthDate)
  }

  const age = () => {
    return calculateAge("1999-03-14")
  }

  const authorSummary = () => {
    return author.summary.replace("%d", age())
  }

  return (
    <div className="px-5">
      <div className="flex items-center">
        <StaticImage
          className="z-10 overflow-hidden rounded-full"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/bio/avatar.jpg"
          width={avatarSize}
          height={avatarSize}
          quality={100}
          alt="Profile picture"
        />
        <span className="ml-5 text-2xl">{author.name}</span>
      </div>

      {/* 自己紹介文 */}
      <p className="mt-8 text-sm">{authorSummary()}</p>

      {/* サイトについて */}
      <div className="mt-5">
        <SiteAboutLink />
      </div>

      {/* リンク */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {links.map(link => (
          <LinkCard {...link} key={link.label} />
        ))}
      </div>
    </div>
  )
}
