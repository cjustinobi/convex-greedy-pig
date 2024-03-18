import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const defaultClassName =
    'flex w-[140px] justify-center gap-2 py-3 px-6 rounded-3xl bg-gradient-to-r from-purple-500 via-peach-500 to-orange-500 font-sans text-[#006] leading-6'
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName

  return (
    <button {...rest} className={finalClassName}>
      {children}
    </button>
  )
}

export default Button
