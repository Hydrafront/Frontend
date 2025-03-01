import clsx from "clsx"

const LabelText: React.FC<{ children: string, className?: string }> = ({ children, className }) => {
  return (
    <p className={clsx("text-[15px] mb-1", className)} >{children}</p>
  )
}
export default LabelText;