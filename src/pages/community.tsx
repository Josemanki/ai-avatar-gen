import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Grid from "../components/Grid";
import Spinner from "../components/Spinner";
import { env } from "../env.mjs";
import { api } from "../utils/api";

const Community: NextPage = () => {
  const { data: communityAvatars, isLoading: isCommunityAvatarsLoading } =
    api.avatars.getCommunityAvatars.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });
  return (
    <main className="mx-auto mt-6 flex flex-col">
      <>
        <h1 className="text-3xl font-bold">Community Icons</h1>
        <h2 className="text-md mt-2">
          Let&apos;s find out what the community has made!
        </h2>
      </>
      {isCommunityAvatarsLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spinner />
        </div>
      ) : communityAvatars && !communityAvatars.length ? (
        <p className="mt-8 text-center">
          The community still hasn&apos;t generated any avatars, do you want to
          be the first to{" "}
          <Link className="link" href={"generate"}>
            generate some?
          </Link>
        </p>
      ) : (
        communityAvatars && (
          <Grid>
            {communityAvatars.map((image) => {
              return (
                <Image
                  key={image.lowResURL}
                  className="rounded-3xl"
                  src={`${env.NEXT_PUBLIC_AWS_BUCKET_URL}/low-res/${image.lowResURL}`}
                  alt={image.prompt}
                  title={image.prompt}
                  width="256"
                  height="256"
                />
              );
            })}
          </Grid>
        )
      )}
    </main>
  );
};

export default Community;
