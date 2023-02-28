import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "react-feather";
import { landingPageActionItems, userReviews } from "../utils/constants";

const Home: NextPage = () => {
  return (
    <>
      <main className="container flex  flex-col items-center justify-center bg-gradient-to-b from-base-100 to-base-300">
        <div className="flex min-h-[calc(100vh-82px)] flex-col items-center justify-center gap-4 px-4 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight md:text-[4rem] md:leading-[4rem]">
            Generate unique avatars with simple UI prompts
          </h1>
          <p className="text-center text-xl">
            This application will let you generate exciting avatars using AI,
            just imagine what you want, and it'll know what to show!
          </p>
          <Link href={"generate"} className="btn-primary btn">
            Get Started
          </Link>
        </div>
        <div className="px-4 text-center lg:px-8">
          <p className="text-3xl font-semibold">
            Let's find your perfect avatar!
          </p>
          <p className="mt-6 text-lg leading-loose">
            Getting unique, personalized avatars that{" "}
            <span className="font-bold italic">you</span> like is usually very
            complicated, but with our services you will get a beautiful avatar
            in just a couple of seconds. Just describe it and we'll do the rest!
          </p>

          <h2 className="mt-20 text-2xl font-semibold">
            But why our service, then?
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {landingPageActionItems.map(({ Icon, title, description }) => (
              <div className="flex items-start gap-6 text-left">
                <div className="mt-1 rounded-lg bg-primary p-2">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl">{title}</p>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-center text-2xl font-semibold">
            Some users have said...
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {userReviews.map(({ avatar, name, username, review }) => (
              <div className="flex w-full flex-col gap-2 rounded-lg border border-white p-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={avatar}
                    alt="asdf"
                    width={54}
                    height={54}
                    className="rounded-xl"
                  />
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p>{username}</p>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        className="fill-yellow-500 text-yellow-500"
                        key={index}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-justify">{review}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center px-4 text-center lg:px-16">
            <p className="mt-20 text-2xl font-semibold">
              So... Convinced yet? ;)
            </p>
            <p>
              Let's go make yourself a beautiful avatar you'll be able to use to
              show your Discord friends how cool you are and how great of an
              imagination you've got!
            </p>
            <Link href={"generate"} className="btn-primary btn mt-6">
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
