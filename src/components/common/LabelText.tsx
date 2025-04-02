import clsx from "clsx"

const LabelText: React.FC<{ children: string, className?: string, required?: boolean }> = ({ children, className, required=true }) => {
  return (
    <p className={clsx("text-[15px] mb-1", className)} >{children}{required ? <b className="text-red-500"> *</b> : ""}</p>
  )
}
export default LabelText;