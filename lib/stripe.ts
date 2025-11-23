import Stripe from "stripe";

// Use a precise type: Stripe when a real key is present; otherwise a Partial<Stripe>
let stripe: Stripe | Partial<Stripe>;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-03-31.basil",
  });
} else {
  console.warn(
    "STRIPE_SECRET_KEY is not defined — exporting a stub stripe object for build-time checks"
  );
  // Minimal stub implementing only the methods the app uses.
  stripe = {
    webhooks: {
      constructEvent: () => {
        throw new Error("STRIPE_SECRET_KEY is not defined");
      },
    },
    invoices: {
      retrieve: async () => null,
    },
    checkout: {
      sessions: {
        listLineItems: async () => ({ data: [] }),
      },
    },
    customers: {
      list: async () => ({ data: [] }),
    },
  };
}

export default stripe as Stripe;
