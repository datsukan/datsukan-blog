import { useState } from "react"

import { Parent } from "@components/comment/display/parent"
import { Child } from "@components/comment/display/child"
import { ReplyAddButton } from "@components/comment/display/reply-add-button"
import { ReplyInfo } from "@components/comment/display/reply-info"
import { Reply } from "@components/comment/input/reply"

type Comment = {
  id: string
  name: string
  comment: string
  createdAt: string
}

type Props = {
  articleId: string
  parent: Comment
  children: Comment[]
  refresh: Function
}

export const Thread = ({ articleId, parent, children, refresh }: Props) => {
  const [displayInputReply, setDisplayInputReply] = useState(false)
  const showInputReply = () => {
    setDisplayInputReply(true)
  }
  const hideInputReply = () => {
    setDisplayInputReply(false)
  }

  const ChildComments = () => {
    return (
      <>
        {children.map((child, _) => {
          return <Child {...child} key={child.id} />
        })}
      </>
    )
  }

  return (
    <>
      <Parent {...parent} />
      <div className="my-3 flex">
        <ReplyInfo amount={children.length} onClick={() => showInputReply()} />
      </div>
      <hr className="mb-5" />
      <div className="flex flex-col gap-2">
        <ChildComments />
      </div>
      <div className="mt-3">
        {displayInputReply ? (
          <Reply
            articleId={articleId}
            id={parent.id}
            cancel={hideInputReply}
            refresh={refresh}
          />
        ) : (
          <ReplyAddButton onClick={() => showInputReply()} />
        )}
      </div>
    </>
  )
}
