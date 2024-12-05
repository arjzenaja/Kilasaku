import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stiripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch(error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}