import { useState } from "react"

import { Parent } from "@components/comment/Display/Parent"
import { ReplyAddButton } from "@components/comment/Display/ReplyAddButton"
import { Reply } from "@components/comment/Input/Reply"

type Props = {
  articleId: string
  id: string
  name: string
  comment: string
  createdAt: string
  refresh: Function
}

export const Single = ({
  articleId,
  id,
  name,
  comment,
  createdAt,
  refresh,
}: Props) => {
  const [displayInputReply, setDisplayInputReply] = useState(false)
  const showInputReply = () => {
    setDisplayInputReply(true)
  }
  const hideInputReply = () => {
    setDisplayInputReply(false)
  }

  return (
    <>
      <Parent id={id} name={name} comment={comment} createdAt={createdAt} />
      <div className="mt-3">
        {displayInputReply ? (
          <Reply
            articleId={articleId}
            id={id}
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
