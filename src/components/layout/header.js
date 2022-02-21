import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

export const Header = ({ className }) => {
  const logoImage = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "text-logo.svg" }) {
        publicURL
      }
    }
  `)
  const logoUrl = logoImage.file.publicURL

  return (
    <header
      className={`h-20 flex items-center mx-2 max-w-screen-lg lg:mx-auto ${className}`}
    >
      <Link to="/">
        <img src={logoUrl} height="auto" width={250} alt="logo" />
      </Link>
    </header>
  )
}
