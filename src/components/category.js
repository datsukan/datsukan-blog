import { Link, useStaticQuery, graphql } from "gatsby"

export const Category = ({ className }) => {
  const data = useStaticQuery(graphql`
    {
      allMicrocmsCategory(sort: { fields: [name], order: ASC }) {
        edges {
          node {
            id
            name
            label
            iconImage {
              url
            }
            order
          }
        }
      }
    }
  `)

  const categories = data.allMicrocmsCategory.edges

  return (
    <div className={className}>
      <span className="text-md font-bold">記事のカテゴリ</span>
      <div className="mt-5 grid grid-cols-3 gap-5">
        {categories.map(({ node }) => {
          const category = node

          return (
            <Link to={`/category/${category.name}`}>
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full border-2 border-tertiary h-20 w-20 flex justify-center item-center overflow-hidden"
                  key={category.id}
                >
                  <img
                    className="m-3"
                    src={category.iconImage.url}
                    alt={category.label}
                  />
                </div>
                <span className="mt-2 text-xs font-semibold">
                  {category.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
