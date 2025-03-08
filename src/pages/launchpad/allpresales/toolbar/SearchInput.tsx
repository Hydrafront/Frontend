import { Input, InputProps } from "@material-tailwind/react";
import { IconSearch } from "@tabler/icons-react";

const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      crossOrigin={"false"}
      placeholder="Search..."
      className="placeholder:opacity-50 text-white"
      icon={<IconSearch className="opacity-50" />}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      {...props}
    />
  );
};
export default SearchInput;
