import IconText from "@/components/common/IconText";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@material-tailwind/react";
import {
  IconBrandTwitter,
  IconBrandTelegram,
  IconBrandDiscord,
  IconWorld,
} from "@tabler/icons-react";

const TokenCommonInfo = () => {
  const { token } = useAppSelector((state) => state.token);
  const linkArr = [];
  if (token?.website)
    linkArr.push({
      icon: <IconWorld size={16} />,
      text: "Website",
      link: token?.website,
    });
  if (token?.twitter)
    linkArr.push({
      icon: <IconBrandTwitter size={16} />,
      text: "Twitter",
      link: token?.twitter,
    });
  if (token?.telegram)
    linkArr.push({
      icon: <IconBrandTelegram size={16} />,
      text: "Telegram",
      link: token?.telegram,
    });
  if (token?.discord)
    linkArr.push({
      icon: <IconBrandDiscord size={16} />,
      text: "Discord",
      link: token?.discord,
    });
  return (
    <div className="mt-10 border border-borderColor rounded-md pb-5" id="common-token-info">
      <div className="flex flex-col -mt-6 items-center gap-1 mb-3">
        <img
          src={token?.logo}
          alt="token-avatar"
          className="w-[80px] h-[80px] rounded-md"
        />
        <span className="text-xl text-white text-center">{token?.name}</span>
      </div>
      <div className="px-2 justify-center flex-wrap flex gap-2 mb-3">
        {linkArr.map((item) => (
          <Button
            key={item.text}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="py-2"
          >
            <IconText>
              {item.icon}
              <span>{item.text}</span>
            </IconText>
          </Button>
        ))}
      </div>
      <p className="text-center">{token?.description}</p>
    </div>
  );
};

export default TokenCommonInfo;
