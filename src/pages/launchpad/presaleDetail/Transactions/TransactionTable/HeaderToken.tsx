import { useAppDispatch } from "@/store/hooks";
import FilterHeader from "./FilterHeader";
import { openDialog } from "@/store/reducers/dialog-slice";
import { Button, DialogBody, DialogFooter } from "@material-tailwind/react";
import { IconCheck } from "@tabler/icons-react";
import IconInput from "@/components/common/IconInput";
import IconText from "@/components/common/IconText";
import CustomDialogHeader from "@/components/common/CustomDialogHeader";

const HeaderToken = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openDialog({
        children: (
          <>
            <CustomDialogHeader>
              <h6 className="mb-0 flex-1">Filter Amount {name}</h6>
            </CustomDialogHeader>
            <DialogBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="px-8"
            >
              <div className="flex flex-col gap-2">
                <IconInput
                  type="number"
                  placeholder="Min"
                  icon={<span>{name}</span>}
                  side="right"
                />
                <IconInput
                  type="number"
                  placeholder="Max"
                  icon={<span>{name}</span>}
                  side="right"
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
        title={name}
        className="min-w-32 cursor-pointer justify-end"
        onClick={handleClick}
      />
    </div>
  );
};

export default HeaderToken;
