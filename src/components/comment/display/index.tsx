import { Single } from "@components/comment/display/single"
import { Thread } from "@components/comment/display/thread"
import type { Comment } from "@components/comment"

type Props = {
  articleId: string
  comments: Comment[]
  refresh: Function
}

export const Display = ({ articleId, comments, refresh }: Props) => {
  return (
    <>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            <div className="m-5">
              {generateComment(refresh, articleId, comment)}
            </div>
            <hr />
          </div>
        )
      })}
    </>
  )
}

const generateComment = (
  refresh: Function,
  articleId: string,
  comment: Comment
) => {
  if ("children" in comment && (comment.children ?? []).length > 0) {
    let { children, ...parent } = comment
    return (
      <Thread
        articleId={articleId}
        parent={parent}
        children={children ?? []}
        refresh={refresh}
      />
    )
  }

  return <Single articleId={articleId} {...comment} refresh={refresh} />
}
