// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "./client";
import React from "react";

let sanityFetch: any;
let SanityLive: any;

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  // In local/dev environments we may not have a SANITY_API_READ_TOKEN set.
  // Fall back to a minimal compatibility layer that uses the client.fetch
  // so builds and local development can proceed without a token.
  console.warn(
    "SANITY_API_READ_TOKEN is not set — falling back to client.fetch (live updates disabled)"
  );

  sanityFetch = async ({ query, params }: { query: string; params?: any }) => {
    try {
      const data = await client.fetch(query, params || {});
      return { data } as const;
    } catch (error) {
      console.error("sanityFetch fallback error:", error);
      return { data: null } as const;
    }
  };

  SanityLive = ({ children }: { children: React.ReactNode }) => {
    // no-op wrapper when live updates are unavailable
    return React.createElement(React.Fragment, null, children);
  };
} else {
  const live = defineLive({
    client,
    serverToken: token,
    browserToken: token,
    fetchOptions: {
      revalidate: 0,
    },
  });
  sanityFetch = live.sanityFetch;
  SanityLive = live.SanityLive;
}

export { sanityFetch, SanityLive };
