import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import AuthedNavbar from "./AuthedNavbar";
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
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-base-100 to-base-300 px-4 pt-6 pb-12">
        <div className="mx-auto sm:max-w-3xl">{children}</div>
      </div>
    </>
  );
};

export default Layout;
