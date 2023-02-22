export type Context = {
  categoryId: string
  categorySlug: string
  categoryName: string
}

export type Category = {
  slug: string
  name: string
  image: {
    url: string
  }
}
