import React from "react";
import LabelText from "./LabelText";
import { useAppDispatch } from "@/store/hooks";
import { closeDialog } from "@/store/reducers/dialog-slice";
// import CustomInput from './CustomInput'
// import CustomTextarea from './CustomTextarea'
// import GradientButton from './GradientButton'

interface Props {}

const MessageBox: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(closeDialog());
  };
  return (
    <div className="bg-lightColor p-10 pb-3 w-full overflow-y-scroll">
      <h5 className="mb-5 text-center">Success</h5>
      <LabelText className="text-center">
        You sent email to us successfully. We will reply you back...
      </LabelText>
      <div className="w-full flex justify-center mt-5">
        <button
          className="px-[30px] py-2 bg-green-500 text-white rounded-lg"
          onClick={handleClick}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
