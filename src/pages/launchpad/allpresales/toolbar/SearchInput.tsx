import { Input } from "@material-tailwind/react";
import { IconSearch } from "@tabler/icons-react";

const SearchInput: React.FC = () => {
  return (
      <Input crossOrigin={'false'} placeholder="Search..." className="placeholder:opacity-50" icon={<IconSearch className="opacity-50" />} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
  )
}
export default SearchInput;