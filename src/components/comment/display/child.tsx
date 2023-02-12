import { CommentInfo } from "@components/comment/display/comment-info"
import { Markdown } from "@components/comment/markdown"

type Props = {
  id: string
  name: string
  comment: string
  createdAt: string
}

export const Child = ({ id, name, comment, createdAt }: Props) => {
  return (
    <div className="flex flex-col gap-2" id={id}>
      <CommentInfo id={id} name={name} createdAt={createdAt} />
      <div className="flex">
        <div className="flex w-8 justify-center">
          <div className="h-full border-r border-l border-gray-200"></div>
        </div>
        <div className="flex-1">
          <Markdown text={comment} />
        </div>
      </div>
    </div>
  )
}
