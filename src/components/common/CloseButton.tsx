import { IconX } from "@tabler/icons-react";
import clsx from "clsx";

const CloseButton = ({
  handleOpen,
  className,
}: {
  handleOpen: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={handleOpen}
      className={clsx("border border-borderColor rounded-md p-1", className)}
    >
      <IconX size={20} color="white" />
    </button>
  );
};

export default CloseButton;
1;
