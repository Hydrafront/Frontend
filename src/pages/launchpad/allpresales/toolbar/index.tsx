import ListBtnGroup from "./ListBtnGroup";
import SearchInput from "./SearchInput";
import Categories from "./Catgories";
import DragScrollbar from "./DragScrollbar";

interface PropsType {
  style: string;
  setStyle: (value: string) => void;
  tab: string;
  setTab: (value: string) => void;
}

const Toolbar: React.FC<PropsType> = ({ style, setStyle, tab, setTab }) => {
  return (
    <>
      <div className="md:flex justify-between items-center mt-4 mb-3">
        <div className="flex items-center w-full md:w-1/2 justify-center lg:justify-start">
          <ListBtnGroup style={style} setStyle={setStyle} />
          <div className="ml-4 w-full md:w-[250px] lg:w-[300px]">
            <SearchInput />
          </div>
        </div>
        <div className="w-full xl:w-[430px] flex justify-center mt-3 md:mt-0">
          <Categories tab={tab} setTab={setTab} />
        </div>
      </div>
      <DragScrollbar />
    </>
  );
};
export default Toolbar;
