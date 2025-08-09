import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
};

const CustomNavLink = ({ children, to, className, onClick }: Props) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`tracking-wider source-code nav-link text-gray-400 text-sm cursor-pointer ${className}`}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
