import { Outlet } from "react-router-dom";
import Gradient from "../../components/shared/Gradient";
import Navbar from "../../components/shared/navbar/Navbar";
import BehindNav from "../../components/shared/BehindNav";
import Footer from "../../components/shared/Footer";

const RootLayout = () => {
  return (
    <Gradient>
      <BehindNav />
      <Navbar />
      <Outlet />
      <Footer />
    </Gradient>
  );
};

export default RootLayout;
