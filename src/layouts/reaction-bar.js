import { GoodButton } from "@components/good-button"

export const ReactionBar = ({ className = "", articleID }) => {
  return (
    <div className={className}>
      <GoodButton articleID={articleID} />
    </div>
  )
}
