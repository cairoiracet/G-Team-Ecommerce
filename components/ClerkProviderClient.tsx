"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const ClerkProviderClient: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkProviderClient;
