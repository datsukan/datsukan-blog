import { Bio } from "@components/bio"
import { Hr } from "@components/hr"
import { Category } from "@components/category"
import { Tags } from "@components/tags"

export const Sidebar = ({ className }) => {
  return (
    <div className={`w-full md:w-72 h-full ${className}`}>
      <Bio />
      <Hr className="my-7" />
      <Category />
      <Hr className="my-7" />
      <Tags />
    </div>
  )
}
