import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomDialog from "@/components/common/CustomDialog";
import Footer from "@/components/home/footer";
import PriceEthProvider from "@/components/ui/PriceEthProvider";
import Header from "@/layout/header";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <PriceEthProvider>
      <div>
        <Header />
        <Outlet />
        <CustomDialog />
        <ConfirmDialog />
        <Footer />
      </div>
    </PriceEthProvider>
  );
};
export default Layout;
