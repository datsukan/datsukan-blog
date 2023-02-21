export type Article = {
  id: string
  slug: string
  createdAt: dayjs.Dayjs
  formattedCreatedAt: string
  title: string
  emoji: string
  category: {
    slug: string
    name: string
  }
  tags: {
    slug: string
    name: string
  }
}
