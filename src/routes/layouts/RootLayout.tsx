import { Outlet } from "react-router";
import Gradient from "../../components/shared/Gradient";
import Navbar from "../../components/shared/navbar/Navbar";
import BehindNav from "../../components/shared/BehindNav";

const RootLayout = () => {
  return (
    <Gradient>
      <BehindNav />
      <Navbar />
      <Outlet />
    </Gradient>
  );
};

export default RootLayout;
