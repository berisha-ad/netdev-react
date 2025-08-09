import { useState } from "react";
import { NavLink } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn";
import Logo from "./Logo";
import CustomNavLink from "./NavLink";
import UserMenu from "./UserMenu";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../../../contexts/AuthContext";

const NavMenu = () => {
  const { isAuthenticated, userInfo, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 max-sm:px-0">
      {/* Logo */}
      <NavLink to="/" className="flex logo-link items-center gap-2">
        <Logo textFill="#555" className="h-8" />
      </NavLink>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center">
        <li>
          <CustomNavLink to="/">Home</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/search">Search</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/about">About</CustomNavLink>
        </li>
        {isAuthenticated ? (
          <>
            {userInfo ? (
              <li>
                <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
              </li>
            ) : (
              <li>
                <CustomNavLink to="/user-info-setup">Complete Profile</CustomNavLink>
              </li>
            )}
            <li>
              <UserMenu />
            </li>
          </>
        ) : (
          <>
            <li>
              <CustomNavLink to="/login">Login</CustomNavLink>
            </li>
            <li>
              <NavLink to="/register">
                <PrimaryBtn>Sign Up</PrimaryBtn>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 mobile-menu-overlay z-40" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 mobile-menu shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-800">Menu</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 p-4">
            <ul className="space-y-4">
              <li>
                <CustomNavLink to="/" onClick={closeMobileMenu}>Home</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/search" onClick={closeMobileMenu}>Search</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/about" onClick={closeMobileMenu}>About</CustomNavLink>
              </li>
              {isAuthenticated ? (
                <>
                  {userInfo ? (
                    <>
                      <li>
                        <CustomNavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</CustomNavLink>
                      </li>
                      <li>
                        <CustomNavLink to={`/profile/${user?.username}`} onClick={closeMobileMenu}>Profile</CustomNavLink>
                      </li>
                    </>
                  ) : (
                    <li>
                      <CustomNavLink to="/user-info-setup" onClick={closeMobileMenu}>Complete Profile</CustomNavLink>
                    </li>
                  )}
                  <li className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 p-2">
                      <UserAvatar user={user!} size="sm" />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.first_name}
                      </span>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <CustomNavLink to="/login" onClick={closeMobileMenu}>Login</CustomNavLink>
                  </li>
                  <li>
                    <NavLink to="/register" onClick={closeMobileMenu}>
                      <PrimaryBtn>Sign Up</PrimaryBtn>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Menu Footer */}
          {isAuthenticated && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={async () => {
                  closeMobileMenu();
                  try {
                    await logout();
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
