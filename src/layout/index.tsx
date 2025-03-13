import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomDialog from "@/components/common/CustomDialog";
import Footer from "@/components/home/footer";
import LoadingMask from "@/components/ui/LoadingMask";
import PriceEthProvider from "@/components/ui/PriceEthProvider";
import Header from "@/layout/header";
import { useAppSelector } from "@/store/hooks";
import { Outlet } from "react-router";

const Layout: React.FC = () => {

  const { isLoading } = useAppSelector((state) => state.loading);

  return (
    <PriceEthProvider>
      <div>
        <Header />
        <Outlet />
        <CustomDialog />
        <ConfirmDialog />
        <Footer />
      </div>
      {isLoading && <LoadingMask />}
    </PriceEthProvider>
  );
};
export default Layout;
