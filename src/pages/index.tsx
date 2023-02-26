import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-[calc(100vh-136px)] flex-col items-center justify-center bg-gradient-to-b from-base-100 to-base-300">
        <div className=" container flex flex-col items-center justify-center gap-4 px-4 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white md:text-[4rem] md:leading-[4rem]">
            Generate unique avatars with simple UI prompts
          </h1>
          <p className="text-center text-xl text-white">
            This application will let you generate exciting avatars using AI,
            just imagine what you want, and it'll know what to show!
          </p>
          <Link href={"generate"} className="btn-primary btn">
            Get Started
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
