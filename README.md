# AI Avatar Generator

Avatar Generator leveraging AI services to create, store and serve generated avatars. Features a community page where users are also able to see what the community has made :).

## So how did you build this?

The main tech used was the following:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Stripe](https://stripe.com/)
- [OpenAI Dall-E](https://openai.com/product/dall-e-2)

## Installation and setup

- Install all dependencies by running `yarn`.
- Make a `.env` file and populate it with the contents of `.env.example`.
- You might need to populate or delete Discord and/or Google OAuth providers in `src/server/auth.ts`.
- After populating your database URL in `.env`, you will have to run `npx prisma push` in order to push the schema to your desired database provider. Do know that this application is configured to run with Postgres and you might have to tweak the application to run it with other services.
- The default command for starting the application is `yarn dev`.

## How do I deploy this?

- Deployment, due to how the application works, is best suited on AWS since Lambdas have longer timeouts and will endure the big chunk of data coming from Dall-E, so I can recommend AWS Amplify since it's quick, easy, and most likely free.
