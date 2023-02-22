import { useEffect, useRef } from "react"
import { CommentInfo } from "@components/comment/Display/CommentInfo"
import { CommentMarkdown } from "datsukan-blog-markdown"

type Props = {
  id: string
  name: string
  comment: string
  createdAt: string
}

export const Parent = ({ id, name, comment, createdAt }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const targetId = window.location.hash.replace("#", "")
    if (targetId === id) {
      console.log("match comment anchor")
      ref.current?.scrollIntoView()
    }
  }, [])

  return (
    <div className="flex flex-col gap-4" id={id} ref={ref}>
      <CommentInfo id={id} name={name} createdAt={createdAt} />
      <CommentMarkdown text={comment} />
    </div>
  )
}
