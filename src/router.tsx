import Layout from "@/layout";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import AllPresales from "@/pages/launchpad/allpresales";
import Locks from "./pages/launchpad/locks";
import ContactUs from "./pages/launchpad/contactus";
import MyPortfolio from "./pages/launchpad/myPortfoio";
import Tokens from "./pages/launchpad/myPortfoio/Tokens";
import MyInvestments from "./pages/launchpad/myPortfoio/myInvestments";
import CreateAirdrop from "./pages/launchpad/createAirdrop";
import ManagePresale from "./pages/launchpad/managePresale";
import LaunchPad from "./pages/launchpad";
import PresaleDetail from "./pages/launchpad/presaleDetail";
import Doc from "./pages/doc";
import UserGuide from "./pages/userGuide";
import ManagePosition from "./pages/launchpad/managePosition";
import CreateTokenPresale from "./pages/launchpad/createTokenPresale";
import CreateTokenERC20 from "./pages/launchpad/createTokenERC20";

const element = createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LaunchPad />}>
        <Route path="" element={<AllPresales />} />
        <Route path="create-token-presale" element={<CreateTokenPresale />}></Route>
        <Route path="create-token-erc20" element={<CreateTokenERC20 />} />
        <Route path="my-portfolio" element={<MyPortfolio />}>
          <Route path="tokens" element={<Tokens />} />
          <Route path="my-investments" element={<MyInvestments />} />
        </Route>
        <Route path="locks" element={<Locks />} />
        <Route path="create-airdrop" element={<CreateAirdrop />} />
        <Route path="manage-presale" element={<ManagePresale />} />
        <Route path="apply-for-audit" element={<ContactUs />} />
        <Route path="doc" element={<ContactUs />} />
        <Route path="market-makers" element={<ContactUs />} />
        <Route path="advertising-orgs" element={<ContactUs />} />
        <Route path="kol-groups" element={<ContactUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="detail/:chainId/:tokenAddress/:type" element={<PresaleDetail />} />
        <Route path="manage-position/:type" element={<ManagePosition />} />
      </Route>
      <Route path="doc" element={<Doc />} />
      <Route path="userguide" element={<UserGuide />} />
    </Route>
  </>
);
export const router = createBrowserRouter(element);
