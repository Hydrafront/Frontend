import { SVGProps } from "react";

const UpSvg: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 4L3.5 0L7 4H0Z" fill="#00D26C" />
    </svg>
  )
}
export default UpSvg;