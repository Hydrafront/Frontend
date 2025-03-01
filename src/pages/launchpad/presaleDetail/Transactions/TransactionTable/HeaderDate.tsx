import { useAppDispatch } from "@/store/hooks";
import FilterHeader from "./FilterHeader";
import { openDialog } from "@/store/reducers/dialog-slice";
import { Button, DialogBody, DialogFooter } from "@material-tailwind/react";
import { IconCheck } from "@tabler/icons-react";
import IconInput from "@/components/common/IconInput";
import IconText from "@/components/common/IconText";
import CustomDialogHeader from "@/components/common/CustomDialogHeader";

const HeaderDate = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openDialog({
        children: (
          <>
            <CustomDialogHeader>
              <h6 className="mb-0 flex-1">Filter by Date</h6>
            </CustomDialogHeader>
            <DialogBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="flex flex-col gap-2">
                <IconInput
                  icon={<div className="text-center w-16">From</div>}
                  side="left"
                  type="datetime-local"
                />
                <IconInput
                  icon={<div className="text-center w-16">To</div>}
                  side="left"
                  type="datetime-local"
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
        options: {},
      })
    );
  };
  return (
    <div>
      <FilterHeader
        title="DATE"
        className="min-w-32 cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default HeaderDate;
