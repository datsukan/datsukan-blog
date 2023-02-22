import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import { FeedLink } from "@components/FeedLink"

type Props = {
  className?: string
  isRootPage?: boolean
}

export const Header = ({ className = "", isRootPage = false }: Props) => {
  const result = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "text-logo.svg" }) {
        publicURL
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const logoUrl = result.file.publicURL
  const siteTitle = result.site.siteMetadata?.title

  const LogoElement = () => (
    <img src={logoUrl} height="auto" width={250} alt={siteTitle} />
  )

  return (
    <header
      className={`mx-2 flex h-20 max-w-screen-lg items-center justify-between lg:mx-auto ${className}`}
    >
      <Link to="/">
        {isRootPage ? (
          <h1>
            <LogoElement />
          </h1>
        ) : (
          <LogoElement />
        )}
      </Link>
      <FeedLink />
    </header>
  )
}
