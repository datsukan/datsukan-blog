import { useState } from "react"

import { Name } from "@components/comment/input/name"
import { Toolbar } from "@components/comment/input/toolbar"
import { Markdown } from "@components/comment/input/markdown"
import { Preview } from "@components/comment/input/preview"
import { PostButton } from "@components/comment/input/post-button"
import { CancelButton } from "@components/comment/input/cancel-button"
import {
  registerValidate,
  registerComment,
  RegisterCommentRequest,
} from "@components/comment/api"

type Props = {
  articleId: string
  id: string
  cancel: Function
  refresh: Function
}

export const Reply = ({ articleId, id, cancel, refresh }: Props) => {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const post = async () => {
    const req: RegisterCommentRequest = {
      articleId: articleId,
      parentId: id,
      userName: name,
      content: comment,
    }
    if (!registerValidate(req, true)) return
    let abortCtrl = new AbortController()
    setIsLoading(true)
    const result = await registerComment(abortCtrl.signal, req)
    if (!result) {
      setIsLoading(false)
      return
    }
    console.log(result)
    await refresh()
    setIsLoading(false)
    cancel()
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setComment("")
    setShowPreview(false)
  }

  return (
    <div className="flex flex-col gap-4 rounded-md p-5 outline outline-1 outline-gray-200">
      <Name name={name} setName={setName} />
      <Toolbar showPreview={showPreview} setShowPreview={setShowPreview} />
      <Comment
        comment={comment}
        setComment={setComment}
        showPreview={showPreview}
      />
      <div className="flex justify-end gap-2">
        <CancelButton
          label="キャンセル"
          cancel={cancel}
          isLoading={isLoading}
        />
        <PostButton label="返信する" post={post} isLoading={isLoading} />
      </div>
    </div>
  )
}

type CommentProps = {
  comment: string
  setComment: Function
  showPreview: boolean
}

const Comment = ({ comment, setComment, showPreview }: CommentProps) => {
  if (showPreview) {
    return <Preview comment={comment} />
  } else {
    return <Markdown comment={comment} setComment={setComment} />
  }
}
