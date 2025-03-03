import React from "react";
import {
  IconBrandDiscordFilled,
  IconBrandTelegram,
  IconBrandX,
  IconLink,
  IconProps,
  IconWorld,
} from "@tabler/icons-react";

interface PropsType extends IconProps {
  name: string;
}

const LinkIcon: React.FC<PropsType> = ({ name, ...props }) => {
  switch (name) {
    case "discord":
      return <IconBrandDiscordFilled {...props} />;
    case "telegram":
      return <IconBrandTelegram {...props} />;
    case "website":
      return <IconWorld {...props} />;
    case "twitter":
      return <IconBrandX {...props} />;
    default:
      return <IconLink {...props} />;
  }
};

export default LinkIcon;
