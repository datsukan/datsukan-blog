import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

export const Header = ({ className = "", isRootPage }) => {
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
      className={`h-20 flex items-center mx-2 max-w-screen-lg lg:mx-auto ${className}`}
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
    </header>
  )
}
