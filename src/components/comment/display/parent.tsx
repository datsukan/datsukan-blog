import { CommentInfo } from "@components/comment/display/comment-info"
import { Markdown } from "@components/comment/markdown"

type Props = {
  id: string
  name: string
  comment: string
  createdAt: string
}

export const Parent = ({ id, name, comment, createdAt }: Props) => {
  return (
    <div className="flex flex-col gap-4" id={id}>
      <CommentInfo id={id} name={name} createdAt={createdAt} />
      <Markdown text={comment} />
    </div>
  )
}
