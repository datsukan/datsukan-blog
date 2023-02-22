import { useState, useEffect } from "react"

import { Header } from "@components/comment/Header"
import { Display } from "@components/comment/Display"
import { Input } from "@components/comment/Input"
import { refComments } from "@components/comment/api"

export type Comment = {
  id: string
  name: string
  comment: string
  createdAt: string
  children?: Comment[]
}

type Props = {
  articleId: string
}

export const Comment = ({ articleId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([])

  const refresh = async () => {
    let abortCtrl = new AbortController()
    const result = await refComments(abortCtrl.signal, articleId)

    if (!result) return

    const cs: Comment[] = []
    for (const item of result) {
      const c: Comment = {
        id: item.id,
        name: item.userName,
        comment: item.content,
        createdAt: item.createdAt,
      }

      if (item.replyComments && item.replyComments.length > 0) {
        const rcs: Comment[] = []
        for (const replayItem of item.replyComments) {
          let rc: Comment = {
            id: replayItem.id,
            name: replayItem.userName,
            comment: replayItem.content,
            createdAt: replayItem.createdAt,
          }
          rcs.push(rc)
        }
        c.children = rcs
      }

      cs.push(c)
    }

    setComments(cs)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="rounded-lg border border-gray-200">
      <Header />
      <Display articleId={articleId} comments={comments} refresh={refresh} />
      <div className="mt-5">
        <Input articleId={articleId} refresh={refresh} />
      </div>
    </div>
  )
}
