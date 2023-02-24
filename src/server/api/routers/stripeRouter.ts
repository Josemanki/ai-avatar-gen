import { z } from "zod";
import { getOrCreateStripeCustomerIdForUser } from "../../stripe/stripe-webhook-handlers";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { stripe, session, prisma, req } = ctx;

      const customerId = await getOrCreateStripeCustomerIdForUser({
        prisma,
        stripe,
        userId: session.user?.id,
      });

      if (!customerId) {
        throw new Error("Could not create customer");
      }

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? `http://${req.headers.host}`
          : `https://${req.headers.host}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: session.user?.id,
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price: input,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/generate`,
        cancel_url: `${baseUrl}/generate`,
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),

  createBillingPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const { stripe, session, prisma, req } = ctx;

    const customerId = await getOrCreateStripeCustomerIdForUser({
      prisma,
      stripe,
      userId: session.user?.id,
    });

    if (!customerId) {
      throw new Error("Could not create customer");
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? `http://${req.headers.host}`
        : `https://${req.headers.host}`;

    const stripeBillingPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/dashboard`,
      });

    if (!stripeBillingPortalSession) {
      throw new Error("Could not create billing portal session");
    }

    return { billingPortalUrl: stripeBillingPortalSession.url };
  }),
});
