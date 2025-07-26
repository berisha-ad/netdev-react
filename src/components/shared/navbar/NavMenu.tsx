import { NavLink } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn";
import Logo from "./Logo";
import CustomNavLink from "./NavLink";

const NavMenu = () => {
  return (
    <nav className="flex items-center justify-between px-6">
      <NavLink to="/" className="flex logo-link items-center gap-2">
        <Logo textFill="#555" className="h-8" />
      </NavLink>
      <ul className="flex gap-6 items-center">
        <li>
          <CustomNavLink to="/">Home</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/about">About</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/login">Login</CustomNavLink>
        </li>
        <li>
          <NavLink to="/register">
            <PrimaryBtn>Sign Up</PrimaryBtn>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
