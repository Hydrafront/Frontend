import { Link, LinkProps } from "react-router-dom";
import VectorSvg from "../icons/Vector-svg";
import clsx from "clsx";

interface PropsType extends LinkProps {
  text: string;
  to: string;
  color?: string;
}

const PreviewLink: React.FC<PropsType> = ({ text, to, color }) => {
  return (
    <Link to={to} className={clsx("flex", color)}>{text} <VectorSvg className={clsx("ml-1")} /></Link>
  )
}
export default PreviewLink;