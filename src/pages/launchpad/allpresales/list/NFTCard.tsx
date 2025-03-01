import BoltIcon from "@/components/icons/BoltIcon";
import LeafIcon from "@/components/icons/LeafIcon";
import { getCreatedBefore, numberFormat } from "@/utils/func";
import { Card, CardBody } from "@material-tailwind/react";
import { IconTransfer } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import React from "react";
import LinkIcon from "@/components/ui/LinkIcon";
import TokenProgressbar from "@/components/common/TokenProgressbar";
import { TokenType } from "@/interfaces/types";
import { getChainName } from "@/utils/config/chainDexConfig";

export interface NFTCardType extends TokenType {}

const NFTCard: React.FC<NFTCardType> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${props.chainId}/${props.tokenAddress}/${props.type}`);
  };
  return (
    <Card
      className="w-full overflow-hidden bg-lightColor rounded-[15px] mb-4 hover:bg-[#211e2d]"
      style={{ transition: "0.3s" }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onClick={handleClick}
        className="p-4 cursor-pointer"
      >
        <div className="flex">
          <img
            src={props.logo}
            alt="token-avatar"
            className="rounded-md w-[100px] h-[100px] mr-4"
          />
          <div className="flex flex-col justify-center">
            <div>
              <span className="text-[20px] text-gray-500 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
                {props.name}
              </span>
              <span className="text-[20px] text-white overflow-hidden text-ellipsis whitespace-nowrap">
                {props.symbol}
              </span>
            </div>
            <p
              className="text-[13px] text-gray-500 overflow-hidden text-ellipsis break-all"
              style={{
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                display: "-webkit-box",
              }}
            >
              {props.description}
            </p>
          </div>
        </div>
        <hr className="border-borderColor my-3" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="w-[18px] h-[18px]"
              alt="chain-icon"
              src={`/assets/images/chains/${getChainName(props.chainId)}.png`}
            />
            <span className="text-[13px] text-greenColor mx-3">
              {props.progress}%
            </span>
            <span className="text-[13px]">${numberFormat(props.price)}K</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <IconTransfer size={16} className="mr-1" />
              <span className="text-[13px]">
                {props.transaction} / ${numberFormat(props.volume)} vol
              </span>
            </div>
          </div>
        </div>
        <TokenProgressbar value={70} className="my-2" />
        <div className="flex justify-between">
          <div className="flex items-center">
            <LeafIcon width={16} className="mr-1" />
            <span className="text-[13px] text-greenColor">
              {getCreatedBefore(new Date(props.createdAt))}
            </span>
          </div>
          <div className="flex items-center">
            {props.website && (
              <div className="ml-1">
                {<LinkIcon name="website" width={16} />}
              </div>
            )}
            {props.twitter && (
              <div className="ml-1">
                {<LinkIcon name="twitter" width={16} />}
              </div>
            )}
            {props.telegram && (
              <div className="ml-1">
                {<LinkIcon name="telegram" width={16} />}
              </div>
            )}
            {props.discord && (
              <div className="ml-1">
                {<LinkIcon name="discord" width={16} />}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center mr-2 absolute top-2 right-2">
          <BoltIcon />
          <span className="text-[13px] text-orangeColor">{props.boost}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default NFTCard;
