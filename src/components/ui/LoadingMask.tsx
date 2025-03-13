import { useAppSelector } from "@/store/hooks";
import Spin3 from "../spins/Spin3";
import { isEmpty } from "@/utils/validation";

const LoadingMask = () => {
  const { text } = useAppSelector((state) => state.loading);
  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center gap-14 bg-black bg-opacity-75 z-[9999999] w-screen h-screen">
      <Spin3 />
      {isEmpty(text) && <p className="text-white text-2xl font-bold">{text}</p>}
    </div>
  );
};

export default LoadingMask;
