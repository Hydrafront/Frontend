import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomDialog from "@/components/common/CustomDialog";
import Footer from "@/components/home/footer";
import Header from "@/layout/header";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CustomDialog />
      <ConfirmDialog />
      <Footer />
    </>
  );
};
export default Layout;
