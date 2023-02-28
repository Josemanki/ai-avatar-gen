import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../utils/api";

type Props = {
  sessionData: Session;
};
const AuthedNavbar = ({ sessionData }: Props) => {
  const { data: currentUser } = api.user.currentUser.useQuery(undefined, {
    enabled: !!sessionData,
  });

  const { mutateAsync: createCheckoutSession } =
    api.stripe.createCheckoutSession.useMutation();

  const { push } = useRouter();

  const handleGetCredits = async (priceId: string) => {
    const { checkoutUrl } = await createCheckoutSession(priceId);
    if (checkoutUrl) {
      await push(checkoutUrl);
    }
  };

  return (
    <nav className="bg-base-50 navbar self-start lg:px-12">
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
              <Link href="my-avatars">My Avatars</Link>
            </li>
            <li>
              <Link href="community">Community</Link>
            </li>
            <li className="divider"></li>
            <li>
              <span>Credits: {(currentUser && currentUser.credits) ?? 0}</span>
            </li>
            <ul className="space-y-4">
              <li className="divider"></li>
              <li>
                {currentUser && (
                  <a
                    className="btn-primary btn text-white"
                    onClick={() =>
                      void handleGetCredits("price_1MeQ4oE3Wv1FtO4psJEOuIUp")
                    }
                  >
                    Buy Credits
                  </a>
                )}
              </li>
              <li>
                <button
                  className="btn"
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? "Sign Out" : "Sign In"}
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-2 px-1">
          <li>
            <Link href="generate">Generate</Link>
          </li>
          <li>
            <Link href="my-avatars">My Avatars</Link>
          </li>
          <li>
            <Link href="community">Community</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden space-x-4 lg:flex">
        <>
          <span>Credits: {(currentUser && currentUser.credits) ?? 0}</span>
          <a
            className="btn-primary btn"
            onClick={() =>
              void handleGetCredits("price_1MeQ4oE3Wv1FtO4psJEOuIUp")
            }
          >
            {"Buy Credits"}
          </a>
        </>
        <button
          className="btn"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
};

export default AuthedNavbar;
