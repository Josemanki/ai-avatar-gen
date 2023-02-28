import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { Download } from "react-feather";
import Grid from "../components/Grid";
import Spinner from "../components/Spinner";
import { env } from "../env.mjs";
import { getServerAuthSession } from "../server/auth";
import { api } from "../utils/api";
import { downloadImage } from "../utils/image";

const MyAvatars: NextPage = () => {
  const { data: avatars, isLoading: isAvatarsLoading } =
    api.avatars.getUserAvatars.useQuery();
  return (
    <main className="mx-auto flex flex-col">
      <>
        <h1 className="text-3xl font-bold">Your Avatars</h1>
        <h2 className="text-md mt-2">Your beautiful creations in one place!</h2>
      </>
      {isAvatarsLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spinner />
        </div>
      ) : avatars && !avatars.length ? (
        <p className="mt-8 text-center">
          You don't have any avatars yet, you might want to go{" "}
          <Link className="link" href={"generate"}>
            generate some!
          </Link>
        </p>
      ) : (
        avatars && (
          <Grid>
            {avatars.map((image) => {
              return (
                <div className="relative">
                  <div
                    className="absolute right-1 top-1 rounded-full p-1 hover:cursor-pointer hover:bg-slate-300 hover:bg-opacity-50"
                    onClick={() => downloadImage(image.highResURL, image.id)}
                  >
                    <Download />
                  </div>
                  <img
                    key={image.lowResURL}
                    className="rounded-3xl"
                    src={`${env.NEXT_PUBLIC_AWS_BUCKET_URL}/low-res/${image.lowResURL}`}
                    alt={image.prompt}
                    title={image.prompt}
                  />
                </div>
              );
            })}
          </Grid>
        )
      )}
    </main>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default MyAvatars;
