import { Link } from "react-router-dom";

export default function Launchpad() {
    return (
        <Link to='/launchpad'>
            <div className="relative group/whole">
                <div className="py-8 flex items-center gap-2 cursor-pointer group/item relative">
                    Launchpad
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover/item:w-full duration-300 z-10" />
                </div>
            </div>
        </Link>
    )
}
