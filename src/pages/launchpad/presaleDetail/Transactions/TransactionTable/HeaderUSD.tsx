import { useAppDispatch } from "@/store/hooks";
import FilterHeader from "./FilterHeader";
import { openDialog } from "@/store/reducers/dialog-slice";
import { Button, DialogBody, DialogFooter } from "@material-tailwind/react";
import { IconCheck } from "@tabler/icons-react";
import IconInput from "@/components/common/IconInput";
import IconText from "@/components/common/IconText";
import CustomDialogHeader from "@/components/common/CustomDialogHeader";

const HeaderUSD = () => {
  const dispatch = useAppDispatch();

  const initialOption: number[] = [100, 500, 1000, 2500, 5000, 10000];

  const handleClick = () => {
    dispatch(
      openDialog({
        children: (
          <>
            <CustomDialogHeader>
              <h6 className="mb-0 flex-1">Filter Amount USD</h6>
            </CustomDialogHeader>
            <DialogBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="px-8"
            >
              <div className="flex flex-wrap -mx-2">
                {initialOption.map((item, index) => (
                  <div className="px-2 py-1 w-1/3" key={index}>
                    <button className="border-grey w-full border-borderColor hover:bg-lightestColor transition border text-lg text-white rounded-lg py-2">
                      {">$" + item}
                    </button>
                  </div>
                ))}
              </div>
              <hr className="border-borderColor my-4" />
              <div className="flex flex-col gap-2">
                <IconInput
                  placeholder="Min"
                  type="number"
                  icon={<span>$</span>}
                  side="left"
                />
                <IconInput
                  placeholder="Max"
                  type="number"
                  icon={<span>$</span>}
                  side="left"
                />
              </div>
            </DialogBody>
            <DialogFooter
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="justify-center gap-2 py-3 bg-lighterColor border-t border-borderColor"
            >
              <Button
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                color="green"
                className="text-[14px] py-1 text-white"
              >
                <IconText>
                  <IconCheck />
                  Apply
                </IconText>
              </Button>
              <Button
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                variant="outlined"
                className="text-[14px] py-1 text-white border-borderColor"
              >
                Clear
              </Button>
            </DialogFooter>
          </>
        ),
      })
    );
  };
  return (
    <div>
      <FilterHeader
        title="USD"
        className="min-w-24 cursor-pointer justify-end"
        onClick={handleClick}
      />
    </div>
  );
};

export default HeaderUSD;
