import { useState } from "react"
import { Name } from "@components/comment/Input/Name"
import { Toolbar } from "@components/comment/Input/Toolbar"
import { Markdown } from "@components/comment/Input/Markdown"
import { Preview } from "@components/comment/Input/Preview"
import { PostButton } from "@components/comment/Input/PostButton"
import {
  registerValidate,
  registerComment,
  RegisterCommentRequest,
} from "@components/comment/api"

type Props = {
  articleId: string
  refresh: Function
}

export const Input = ({ articleId, refresh }: Props) => {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const post = async () => {
    const req: RegisterCommentRequest = {
      articleId: articleId,
      userName: name,
      content: comment,
    }
    if (!registerValidate(req, false)) return
    let abortCtrl = new AbortController()
    setIsLoading(true)
    const result = await registerComment(abortCtrl.signal, req)
    if (!result) {
      setIsLoading(false)
      return
    }

    await refresh()
    setIsLoading(false)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setComment("")
    setShowPreview(false)
  }

  return (
    <div className="m-5 flex flex-col gap-4">
      <Name name={name} setName={setName} />
      <Toolbar showPreview={showPreview} setShowPreview={setShowPreview} />
      <Comment
        comment={comment}
        setComment={setComment}
        showPreview={showPreview}
      />
      <div className="flex justify-end">
        <PostButton label="投稿する" post={post} isLoading={isLoading} />
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
