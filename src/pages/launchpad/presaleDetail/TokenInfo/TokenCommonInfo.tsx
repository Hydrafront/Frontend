import IconText from "@/components/common/IconText";
import { Button } from "@material-tailwind/react";
import { IconBrandX, IconWorld } from "@tabler/icons-react";

const TokenCommonInfo = () => {
  return (
    <div className="mt-10 border border-borderColor rounded-md pb-5">
      <div className="flex flex-col -mt-6 items-center gap-1 mb-3">
        <img
          src="/assets/images/avatars/b.jpg"
          alt="token-avatar"
          className="w-[80px] h-[80px] rounded-md"
        />
        <span className="text-xl text-white text-center">PINGO</span>
      </div>
      <div className="px-2 justify-center flex gap-2 mb-3">
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="py-2"
        >
          <IconText>
            <IconWorld size={16} />
            <span>Website</span>
          </IconText>
        </Button>
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="py-2"
        >
          <IconText>
            <IconBrandX size={16} />
            <span>Twitter</span>
          </IconText>
        </Button>
      </div>
      <p className="text-center">The scariest cat on Solana.</p>
    </div>
  );
};

export default TokenCommonInfo;
