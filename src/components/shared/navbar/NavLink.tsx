import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
  className?: string;
};

const CustomNavLink = ({ children, to, className }: Props) => {
  return (
    <NavLink
      to={to}
      className={`tracking-wider source-code nav-link text-gray-400 text-sm cursor-pointer ${className}`}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
