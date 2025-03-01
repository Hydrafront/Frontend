import { SVGProps } from 'react'

const GlobalSvg: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{backgroundColor: "lightgrey", borderRadius: "50%", padding: 3}}
      {...props}
    >
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
      <path d='M3.6 9h16.8' />
      <path d='M3.6 15h16.8' />
      <path d='M11.5 3a17 17 0 0 0 0 18' />
      <path d='M12.5 3a17 17 0 0 1 0 18' />
    </svg>
  )
}
export default GlobalSvg
