import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import AuthedNavbar from "./AuthedNavbar";
import Footer from "./Footer";
import UnauthedNavbar from "./UnauthedNavbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>AI Avatar Generator</title>
        <meta name="description" content="Generate avatars via AI prompts!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {sessionData ? (
          <AuthedNavbar sessionData={sessionData} />
        ) : (
          <UnauthedNavbar />
        )}
      </header>
      <div className="mt-6 min-h-[calc(100vh-120px)] bg-gradient-to-b from-base-100 to-base-300 px-4 pb-12 text-white">
        <div className="mx-auto sm:max-w-3xl">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
