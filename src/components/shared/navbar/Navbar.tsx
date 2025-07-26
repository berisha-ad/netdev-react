import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <header className="mt-6 custom-shadow rounded-2xl custom-border bg-white navbar-custom p-4 fixed top-0 left-10 right-10">
      <NavMenu />
    </header>
  );
};

export default Navbar;
