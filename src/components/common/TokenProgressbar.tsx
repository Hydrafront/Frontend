import { Progress, ProgressProps } from "@material-tailwind/react";
import React from "react";

const TokenProgressbar: React.FC<ProgressProps> = (props) => {
  return (
    <Progress
      color="green"
      style={{ backgroundColor: "#99999940" }}
      variant="gradient"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      {...props}
    />
  );
};

export default TokenProgressbar;
