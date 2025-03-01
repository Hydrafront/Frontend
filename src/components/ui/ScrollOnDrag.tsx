import clsx from "clsx";
import React, { useRef } from "react";
import useScrollOnDrag from "react-draggable-scroll";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ScrollOnDrag: React.FC<Props> = ({ children, className }) => {
  const containerRef = useRef(null);

  const { events } = useScrollOnDrag(containerRef);

  return (
    <div {...events} ref={containerRef} className={clsx("overflow-x-scroll scroll-hidden", className)}>
      {children}
    </div>
  );
};

export default ScrollOnDrag;
