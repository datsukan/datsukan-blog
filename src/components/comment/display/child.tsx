import { useEffect, useRef } from "react"
import { CommentInfo } from "@components/comment/Display/CommentInfo"
import { CommentMarkdown } from "datsukan-blog-markdown"

type Props = {
  id: string
  name: string
  comment: string
  createdAt: string
}

export const Child = ({ id, name, comment, createdAt }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const targetId = window.location.hash.replace("#", "")
    if (targetId === id) {
      console.log("match comment anchor")
      ref.current?.scrollIntoView()
    }
  }, [])

  return (
    <div className="flex flex-col gap-2" id={id} ref={ref}>
      <CommentInfo id={id} name={name} createdAt={createdAt} />
      <div className="flex">
        <div className="flex w-8 justify-center">
          <div className="h-full border-r border-l border-gray-200"></div>
        </div>
        <div className="flex-1">
          <CommentMarkdown text={comment} />
        </div>
      </div>
    </div>
  )
}
