import React from "react";
import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from "@crossmint/client-sdk-react-ui";

interface CrossmintProvidersProps {
  children: React.ReactNode;
}

export function CrossmintProviders({ children }: CrossmintProvidersProps) {
  const apiKey = import.meta.env.VITE_CROSSMINT_API_KEY;

  if (!apiKey) {
    console.error("VITE_CROSSMINT_API_KEY is not set");
    return <>{children}</>;
  }

  return (
    <CrossmintProvider apiKey={apiKey}>
      <CrossmintAuthProvider
        loginMethods={["email", "google", "twitter", "web3:evm-only"]}
        appearance={{
          spacingUnit: "8px",
          borderRadius: "12px",
          colors: {
            inputBackground: "#fffdf9",
            buttonBackground: "#fffaf2",
            border: "#835911",
            background: "#FAF5EC",
            textPrimary: "#5f2c1b",
            textSecondary: "#835911",
            textLink: "#1400cb",
            danger: "#ff3333",
            accent: "#602C1B",
          },
        }}
      >
        {children as any}
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
}
