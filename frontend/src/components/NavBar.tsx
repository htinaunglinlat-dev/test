import { Link, NavLink } from "react-router";

const NavList: React.FC<{ to: string; content: string }> = ({ to, content }) => {
  return (
    <li>
      <NavLink className={`font-bold hover:underline transition duration-300 text-gray-200`} to={to}>{content}</NavLink>
    </li>
  );
};

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-sky-500 p-4 shadow-md back">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyLogo
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`md:flex gap-6 absolute md:static bg-blue-600 w-full left-0 md:w-auto md:bg-transparent text-center md:flex-row transition-all ${
            isOpen ? "top-16" : "-top-60"
          }`}
        >
          <NavList to="/" content="Home" />
          <NavList to="/counter" content="Counter" />
          <NavList to="/products" content="products" />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
