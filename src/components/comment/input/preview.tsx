import { Markdown } from "@components/comment/markdown"

type Props = {
  comment: string
}

export const Preview = ({ comment }: Props) => {
  return (
    <div className="max-h-[60rem] min-h-[10rem] overflow-y-auto">
      <Markdown text={comment} />
    </div>
  )
}
