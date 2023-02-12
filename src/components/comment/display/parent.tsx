import { useEffect, useRef } from "react"
import { CommentInfo } from "@components/comment/display/comment-info"
import { Markdown } from "@components/comment/markdown"

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
      <Markdown text={comment} />
    </div>
  )
}