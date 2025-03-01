import IconText from "@/components/common/IconText";
import { Button, ButtonGroup } from "@material-tailwind/react";
import {
  IconArrowDown,
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandTwitter,
  IconDots,
  IconWorld,
} from "@tabler/icons-react";

interface TokenLinkGroupsProps {
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
}
const TokenLinkGroups = ({
  website,
  twitter,
  telegram,
  discord,
}: TokenLinkGroupsProps) => {
  const linkArr = [];
  if (website)
    linkArr.push({
      icon: <IconWorld size={16} />,
      text: "Website",
      link: website,
    });
  if (twitter)
    linkArr.push({
      icon: <IconBrandTwitter size={16} />,
      text: "Twitter",
      link: twitter,
    });
  if (telegram)
    linkArr.push({
      icon: <IconBrandTelegram size={16} />,
      text: "Telegram",
      link: telegram,
    });
  if (discord)
    linkArr.push({
      icon: <IconBrandDiscord size={16} />,
      text: "Discord",
      link: discord,
    });

  return (
    <ButtonGroup
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className="flex w-full -mt-5 justify-center"
    >
      {linkArr.slice(0, 1).map((link, index) => (
        <Button
          key={index}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className={`p-2 w-1/2`}
        >
          <IconText className="justify-center">
            {link.icon}
            <span className="font-bold">{link.text}</span>
          </IconText>
        </Button>
      ))}

      {linkArr.length > 2 && (
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="p-2"
        >
          <IconDots size={16} />
        </Button>
      )}

      <Button
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="p-2"
      >
        <IconArrowDown size={16} />
      </Button>
    </ButtonGroup>
  );
};

export default TokenLinkGroups;
