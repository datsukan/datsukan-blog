import { Link, useStaticQuery, graphql } from "gatsby"

import type { Category as TCategory } from "@my-types/category"

export const Category = ({ className = "" }) => {
  type Node = TCategory & {
    id: string
  }
  type DataProps = {
    allContentfulCategory: {
      nodes: Node[]
    }
  }
  const data = useStaticQuery<DataProps>(graphql`
    {
      allContentfulCategory {
        nodes {
          id: contentful_id
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
                <div className="item-center transition flex h-16 w-16 justify-center overflow-hidden rounded-full ring-2 ring-tertiary group-hover:bg-primary-hover">
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
