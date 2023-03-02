import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../server/db";
import type Stripe from "stripe";
import { handleSuccessfulPayment } from "../../server/stripe/stripe-webhook-handlers";
import { stripe } from "../../server/stripe/client";
import { env } from "../../env.mjs";
import getRawBody from "raw-body";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await getRawBody(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig as string, webhookSecret);

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          await handleSuccessfulPayment({
            event,
            prisma,
          });
          break;
        default:
          // Unexpected event type
          console.log("Unexpected event", event.type);
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
