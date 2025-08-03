import { FC, ReactNode, useMemo, useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionConfig } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import axiosInstance from "./api";
import { toast } from "sonner";

const SignInModal = ({ onSkip }: { onSkip: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(255, 255, 255)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          padding: "48px",
          borderRadius: "12px",
          textAlign: "center",
          width: "420px",
          maxWidth: "90%",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Luxvana International Logo */}
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "28px",
              fontWeight: 600,
              color: "#000000",
              letterSpacing: "1.5px",
              position: "relative",
              paddingBottom: "12px",
            }}
          >
            LUXVANA
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "2px",
                backgroundColor: "#D4AF37",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "#666666",
              letterSpacing: "2px",
              marginTop: "32px",
              marginLeft: "8px",
            }}
          >
            INTERNATIONAL
          </div>
        </div>

        <h2
          style={{
            color: "#000000",
            fontSize: "20px",
            fontWeight: 400,
            letterSpacing: "0.5px",
            marginBottom: "16px",
            fontFamily: "'Cormorant Garamond', serif",
            textTransform: "uppercase",
          }}
        >
          Private Access
        </h2>

        <p
          style={{
            color: "#666666",
            fontSize: "14px",
            marginBottom: "32px",
            lineHeight: "1.6",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 300,
            maxWidth: "320px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Connect your wallet to verify your identity or continue as guest to
          access the Luxvana International experience
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <WalletMultiButton
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderRadius: "0px",
              padding: "14px 28px",
              fontSize: "13px",
              fontWeight: 400,
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Helvetica Neue', sans-serif",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              minWidth: "220px",
            }}
          />
          <button
            onClick={onSkip}
            style={{
              backgroundColor: "transparent",
              color: "#666666",
              borderRadius: "0px",
              padding: "14px 28px",
              fontSize: "13px",
              fontWeight: 400,
              transition: "all 0.3s ease",
              border: "1px solid #666666",
              cursor: "pointer",
              fontFamily: "'Helvetica Neue', sans-serif",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              minWidth: "220px",
            }}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthSigner = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
  const { publicKey, signMessage, connected } = useWallet();
  const [isSigned, setIsSigned] = useState(
    sessionStorage.getItem("signedAuth") === "true"
  );

  useEffect(() => {
    if (!connected || !publicKey || !signMessage || isSigned) return;

    const handleSign = async () => {
      try {
        const rawMessage =
          "Sign in to Luxvana International\n\n" +
          `Wallet: ${publicKey.toString()}\n` +
          `Nonce: ${Math.random().toString(36).substring(2, 15)}`;

        const messageBytes = new TextEncoder().encode(rawMessage);
        const signature = await signMessage(messageBytes);
        sessionStorage.setItem("signedAuth", "true");

        const response = await axiosInstance.post("/authentication/verify", {
          signature,
          publicKey: publicKey.toString(),
          message: rawMessage,
        });

        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          setIsSigned(true);
          onAuthenticated();
          toast("Authentication Success");
        } else {
          console.error("No token received from server");
          toast("Authentication failed: No token received");
        }
      } catch (error: any) {
        console.error("Signing failed:", error);
        toast("Sorry, something went wrong: " + error.message);
      }
    };

    handleSign();
  }, [connected, publicKey, signMessage, isSigned, onAuthenticated]);

  return null;
};

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rpcError, setRpcError] = useState(false);

  // Using Solana devnet endpoint
  const endpoint = useMemo(() => {
    return "https://api.devnet.solana.com"; // Devnet endpoint
    // Alternatively, you could use: "https://devnet.genesysgo.net"
  }, []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("signedAuth") === "true" ||
      localStorage.getItem("guestAuth") === "true"
  );

  const connectionConfig: ConnectionConfig = {
    commitment: "confirmed",
    disableRetryOnRateLimit: false,
  };

  const handleSkipAuth = () => {
    localStorage.setItem("guestAuth", "true");
    setAuthenticated(true);
  };

  if (rpcError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <h2>Network Error</h2>
        <p>Unable to connect to Solana network. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "8px 16px",
            marginTop: "16px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ConnectionProvider endpoint={endpoint} config={connectionConfig}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {!authenticated && (
            <>
              <SignInModal onSkip={handleSkipAuth} />
              <AuthSigner
                onAuthenticated={() => setAuthenticated(true)}
                //@ts-ignore
                onError={() => setRpcError(true)}
              />
            </>
          )}
          {authenticated && children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
