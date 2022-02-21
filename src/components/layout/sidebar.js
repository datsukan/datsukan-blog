import { Bio } from "@components/bio"
import { Hr } from "@components/hr"

export const Sidebar = ({ className }) => {
  return (
    <div className={`w-72 h-full ${className}`}>
      <Bio />
      <Hr className="my-7" />
    </div>
  )
}
