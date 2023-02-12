type Props = {
  onClick: Function
}

export const ReplyAddButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="group rounded-full px-3 py-0.5 outline outline-1 outline-gray-200 hover:bg-gray-100 hover:outline-gray-400"
    >
      <span className="text-xs text-gray-400 group-hover:text-gray-600">
        返信を追加
      </span>
    </button>
  )
}
