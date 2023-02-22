import type { Category } from "@my-types/category"
import type { Tag } from "@my-types/tag"

export type Article = {
  id: string
  slug: string
  title: string
  description: string
  emoji: string
  category: Category
  tags: Tag[]
  body: {
    body: string
  }
  createdAt: dayjs.Dayjs
  formattedCreatedAt: string
  updatedAt: dayjs.Dayjs
  formattedUpdatedAt: string
}
