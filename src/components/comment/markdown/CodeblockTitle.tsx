export type Props = {
  className: string
  title: string
}

export const CodeblockTitle = ({ className = "", title }: Props) => {
  return (
    <span
      className={`rounded-md rounded-b-none bg-slate-600 py-1.5 px-3 text-xs text-white ${className}`}
    >
      {title}
    </span>
  )
}
