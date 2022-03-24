import { Link, useStaticQuery, graphql } from "gatsby"

export const Category = ({ className = "" }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulCategory {
        nodes {
          id
          slug
          name
          image {
            url
          }
        }
      }
    }
  `)

  const categories = data.allContentfulCategory.nodes

  return (
    <div className={className}>
      <span className="text-md font-bold">記事のカテゴリ</span>
      <div className="mt-5 grid grid-cols-3 gap-5">
        {categories.map(category => {
          return (
            <Link to={`/category/${category.slug}`} key={category.id}>
              <div className="group flex flex-col items-center">
                <div className="rounded-full ring-2 ring-tertiary h-16 w-16 flex justify-center item-center overflow-hidden transition group-hover:bg-primary-hover">
                  <img
                    className="m-3"
                    src={category.image.url}
                    alt={category.name}
                  />
                </div>
                <span className="mt-2 text-xs font-semibold">
                  {category.name}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
