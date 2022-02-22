import { Bio } from "@components/bio"
import { Hr } from "@components/hr"

export const Sidebar = ({ className, isShowDetail }) => {
  return (
    <div className={`w-full md:w-72 h-full ${className}`}>
      <Bio />
      {isShowDetail && <Hr className="my-7" />}
    </div>
  )
}
