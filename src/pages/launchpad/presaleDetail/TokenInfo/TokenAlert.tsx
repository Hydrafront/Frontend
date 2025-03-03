import CustomDialogHeader from "@/components/common/CustomDialogHeader";
import CustomSelect from "@/components/common/CustomSelect";
import IconInput from "@/components/common/IconInput";
import IconText from "@/components/common/IconText";
import { useAppDispatch } from "@/store/hooks";
import { openDialog } from "@/store/reducers/dialog-slice";
import { Button, DialogBody } from "@material-tailwind/react";
import {
  IconBell,
  IconCirclePlusFilled,
  IconPaperBag,
} from "@tabler/icons-react";

const TokenAlert = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      openDialog({
        children: (
          <>
            <CustomDialogHeader>
              <h6 className="flex-1">Manage Price Alerts</h6>
            </CustomDialogHeader>
            <DialogBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="mb-4 flex gap-2 items-center">
                <p>Alert me when</p>
                <div>
                  <CustomSelect
                    value="Progress"
                    options={[{ title: "Progress", value: "progress" }]}
                  />
                </div>
              </div>
              <div className="flex gap-3 items-center mb-4 flex-wrap md:flex-nowrap">
                <div>
                  <CustomSelect
                    value="Reaches"
                    options={[{ title: "Reaches", value: "reaches" }]}
                  />
                </div>
                <div>
                  <IconInput type="number" icon={<span>$</span>} side="left" />
                </div>
                <div>
                  <Button
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-green-200 py-2"
                    color="green"
                  >
                    <IconText>
                      <IconCirclePlusFilled color="black" />
                      <span className="text-black whitespace-nowrap text-[14px]">
                        Create Alert
                      </span>
                    </IconText>
                  </Button>
                </div>
              </div>
              <IconInput
                icon={<IconPaperBag />}
                side="left"
                placeholder="Add a note to your alert(optional)"
              />
            </DialogBody>
          </>
        ),
      })
    );
  };
  return (
    <div>
      <Button
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="flex gap-2 items-center justify-center w-full"
        onClick={handleClick}
      >
        <IconBell size={20} />
        <span className="text-[14px]">Alerts</span>
        {/* <span className="w-5 h-5 text-[14px] text-center pt-[1px] bg-red-500 rounded-full">
          3
        </span> */}
      </Button>
    </div>
  );
};

export default TokenAlert;
