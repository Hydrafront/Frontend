import { SVGProps } from "react";

const VectorSvg: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.15991 3.44995H2.65991C2.26209 3.44995 1.88056 3.60799 1.59925 3.88929C1.31795 4.1706 1.15991 4.55213 1.15991 4.94995V11.95C1.15991 12.3478 1.31795 12.7293 1.59925 13.0106C1.88056 13.2919 2.26209 13.45 2.65991 13.45H9.65991C10.0577 13.45 10.4393 13.2919 10.7206 13.0106C11.0019 12.7293 11.1599 12.3478 11.1599 11.95V6.44995M4.15991 10.45L13.1599 1.44995M13.1599 1.44995H9.65991M13.1599 1.44995V4.94995" stroke="#F3F4F6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


  )
}
export default VectorSvg;