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
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

const TokenLinkGroups: React.FC<TokenLinkGroupsProps> = ({
  website = "",
  twitter = "",
  telegram = "",
  discord = "",
}) => {
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
      {linkArr.slice(0, 2).map((link, index) => (
        <Button
          onClick={() => window.open(link.link, "_blank")}
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
          onClick={() => {
            const tokenInfo = document.getElementById("common-token-info");
            tokenInfo?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <IconDots size={16} />
        </Button>
      )}
      {linkArr.length > 0 && (
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="p-2"
          onClick={() => {
            const tokenInfo = document.getElementById("common-token-info");
            tokenInfo?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <IconArrowDown size={16} />
        </Button>
      )}
    </ButtonGroup>
  );
};

export default TokenLinkGroups;
