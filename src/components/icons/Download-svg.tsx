import { SVGProps } from "react";

const DownloadSvg: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 3.17647H5.71429V0H2.28571V3.17647H0L4 6.88235L8 3.17647ZM0 7.94118V9H8V7.94118H0Z" fill="white" />
    </svg>

  )
}
export default DownloadSvg;