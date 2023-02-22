type Props = {
  className?: string
}

export const Footer = ({ className = "" }: Props) => {
  return (
    <footer className={`flex h-28 items-center justify-center ${className}`}>
      © 2022 datsukan
    </footer>
  )
}
