type Props = {
  className?: string
}

export const Hr = ({ className = "" }: Props) => {
  return <div className={`h-px border-t border-tertiary ${className}`} />
}
