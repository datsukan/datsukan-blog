type Props = {
  comment: string
  setComment: Function
}

export const Markdown = ({ comment, setComment }: Props) => {
  const rows = () => {
    return comment.split("\n").length
  }

  return (
    <textarea
      value={comment}
      onChange={e => setComment(e.target.value)}
      className="max-h-[60rem] min-h-[10rem] w-full resize-none border-b outline-none focus:border-b-2 focus:border-blue-500"
      placeholder="記事についてコメントする"
      rows={rows()}
    ></textarea>
  )
}
