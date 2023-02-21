import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "../utils/api";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const { data: currentUser } = api.user.currentUser.useQuery(undefined, {
    enabled: !!sessionData,
  });

  return (
    <nav className="bg-base-50 navbar self-start">
      <div className="navbar-start">
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
            <li className="divider"></li>
            <li>
              {currentUser && <span>Credits: {currentUser.credits}</span>}
            </li>
            <ul className="space-y-4">
              <li className="divider"></li>
              <li>
                {currentUser && (
                  <a className="btn-primary btn">{"Buy Credits"}</a>
                )}
              </li>
              <li>
                <button
                  className="btn"
                  onClick={sessionData ? () => signOut() : () => signIn()}
                >
                  {sessionData ? "Sign Out" : "Sign In"}
                </button>
              </li>
            </ul>
          </ul>
        </div>
        {/* Dropdown ends */}

        {/* Desktop view starts */}
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          AI Gen
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
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
        {currentUser && (
          <>
            <span>Credits: {currentUser.credits}</span>
            <a className="btn-primary btn">{"Buy Credits"}</a>
          </>
        )}
        <button
          className="btn"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
