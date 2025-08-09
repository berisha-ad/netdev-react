import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <header className="mt-6 custom-shadow rounded-2xl custom-border bg-white navbar-custom p-4 max-sm:p-2 fixed top-0 left-4 right-4 md:left-10 md:right-10 z-30">
      <NavMenu />
    </header>
  );
};

export default Navbar;
