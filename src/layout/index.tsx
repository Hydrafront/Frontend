import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomDialog from "@/components/common/CustomDialog";
import Footer from "@/components/home/footer";
import EthPriceProvider from "@/components/ui/ethPriceProvider";
import Header from "@/layout/header";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <EthPriceProvider>
      <Header />
      <Outlet />
      <CustomDialog />
      <ConfirmDialog />
      <Footer />
    </EthPriceProvider>
  );
};
export default Layout;
