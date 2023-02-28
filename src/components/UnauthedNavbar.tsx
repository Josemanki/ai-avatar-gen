import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const UnauthedNavbar = () => {
  return (
    <nav className="bg-base-50 navbar self-start lg:px-16">
      <div className="navbar-start w-screen sm:w-1/2">
        {/* Navbar dropdown for mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="generate">Generate</Link>
            </li>
            <li>
              <Link href="community">Community</Link>
            </li>
            <ul className="space-y-4">
              <li className="divider"></li>
              <li>
                <button className="btn" onClick={() => void signIn()}>
                  Sign In
                </button>
              </li>
            </ul>
          </ul>
        </div>
        {/* Dropdown ends */}

        {/* Desktop view starts */}
        <Link href="/" className="flex h-16 items-center text-xl normal-case">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2 rounded-xl"
          />
          Avatar AI
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal space-x-2 px-1">
          <li>
            <Link href="generate">Generate</Link>
          </li>
          <li>
            <Link href="community">Community</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden space-x-4 lg:flex">
        <button className="btn" onClick={() => void signIn()}>
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default UnauthedNavbar;
