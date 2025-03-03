import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAppDispatch } from "@/store/hooks";
import { openDialog } from "@/store/reducers/dialog-slice";
import ContactForm from "@/components/common/ContactForm";

// import TwitterSvg from "@/components/icons/twitter-svg";
// import TelegramSvg from "@/components/icons/Telegram-svg";
// import DiscordSvg from "@/components/icons/Discord-svg";

export interface LeftSidebarProps {
  handleOpen?: () => void;
}
interface listType {
  title: string;
  url: string;
  comingsoon?: boolean;
}

const listArr: listType[] = [
  {
    title: "All Presales",
    url: "/",
    comingsoon: false,
  },
  {
    title: "➕ Create Token (Presale)",
    url: "/create-token-presale",
    comingsoon: false,
  },
  {
    title: "➕ Create Token (ERC20)",
    url: "/create-token-erc20",
    comingsoon: false,
  },
  { title: "⚙️ Manage Presale", url: "/manage-presale", comingsoon: true },
  { title: "🔐 Lock", url: "/locks", comingsoon: true },
  { title: "📈 Portfolio", url: "/my-portfolio/tokens", comingsoon: true },
  { title: "🍭 Airdrop", url: "/create-airdrop", comingsoon: true },
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ handleOpen }) => {
  const dispatch = useAppDispatch();
  return (
    // <div className="px-3 py-8 h-[calc(100vh-85px)] overflow-y-scroll flex flex-col justify-between">
    <div className="px-3 py-3 flex flex-col justify-between w-[250px] h-[calc(100vh-90.5px)]">
      <div>
        <ul className="">
          {listArr.map((item: listType) => (
            <LinkText
              handleOpen={handleOpen}
              key={item.title}
              title={item.title}
              url={item.url}
              comingsoon={item.comingsoon}
            />
          ))}
          <li
            className="flex items-center gap-2 my-2 p-3 font-primary text-[13px] border border-white rounded-md cursor-pointer"
            onClick={() =>
              dispatch(
                openDialog({
                  title: "Contact Us",
                  children: <ContactForm />,
                })
              )
            }
          >
            <span>📩 Contact Us</span>
          </li>
        </ul>

        <img  src="/assets/images/hd2.png" alt="" />
      </div>
    </div>
  );
};

interface LinkTextProp {
  title: string;
  url: string;
  comingsoon?: boolean;
  handleOpen?: () => void;
}
const LinkText: React.FC<LinkTextProp> = ({
  title,
  url,
  comingsoon,
  handleOpen,
}) => {
  const route = useLocation();

  return (
    <li>
      <Link to={url}>
        <button
          disabled={comingsoon}
          onClick={handleOpen}
          className={clsx(
            "flex w-full relative items-center gap-2 my-2 p-3 font-primary text-[13px] border border-white rounded-md",
            route.pathname.split("/")[1] === url.split("/")[1] &&
              "gradient-text"
          )}
        >
          {title === "All Presales" && (
            <img src="/assets/icons/apps.svg" alt="" width="24" height="24" />
          )}
          <span>{title}</span>
          {comingsoon && (
            <span className="absolute text-[10px] px-1 rounded-sm right-1 bottom-1 bg-red-900">
              coming soon
            </span>
          )}
        </button>
      </Link>
    </li>
  );
};
export default LeftSidebar;
