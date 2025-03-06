import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-50 sticky top-0 bg-gradient-to-r from-blue-500 to-sky-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyLogo
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`overflow-hidden z-48 md:flex gap-6 absolute md:static bg-blue-500 w-full left-0 md:w-auto md:bg-transparent text-center md:flex-row transition-[height] duration-200 top-16 h-0 md:h-auto ${isOpen && "h-[160px]"}`}
        >
          <NavList to="/" content="Home" />
          <NavList to="/counter" content="Counter" />
          <NavList to="/products" content="products" />
          {/* <NavList to="/productIntersectionObserver" content="productsIO" /> */}
          <NavList to="/productIOLibrary" content="productsLZ" />
        </ul>
      </div>
    </nav>
  );
};

const NavList: React.FC<{ to: string; content: string }> = ({ to, content }) => {
  return (
    <li>
      <NavLink className={`block font-bold p-2 rounded-sm hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-md transition duration-300 text-white`} to={to}>{content}</NavLink>
    </li>
  );
};

export default NavBar;
