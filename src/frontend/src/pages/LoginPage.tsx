import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Fingerprint, Key, Loader2, Lock, Shield, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

type Step = "username" | "password" | "token" | "fingerprint";

const ROLE_ROUTES: Record<string, string> = {
  superior: "/portal/superior",
  admin: "/portal/admin",
  accountant: "/portal/accountant",
  teacher: "/portal/teacher",
  student: "/portal/student",
  parent: "/portal/parent",
  admin_sys: "/portal/admin",
  user: "/portal/student",
  guest: "/portal/student",
};

function getRoleRoute(role: string): string {
  return ROLE_ROUTES[role.toLowerCase()] ?? "/portal/student";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { actor } = useActor();

  const [step, setStep] = useState<Step>("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepIndex = ["username", "password", "token", "fingerprint"].indexOf(
    step,
  );

  const handleNext = async () => {
    setError(null);
    if (step === "username") {
      if (!username.trim()) {
        setError("Username is required.");
        return;
      }
      setStep("password");
    } else if (step === "password") {
      if (!password.trim()) {
        setError("Password is required.");
        return;
      }
      setStep("token");
    } else if (step === "token") {
      if (!token.trim()) {
        setError("Security token is required.");
        return;
      }
      setStep("fingerprint");
      setTimeout(() => handleFinalAuth(), 2000);
    }
  };

  const handleFinalAuth = async () => {
    setLoading(true);
    try {
      if (actor) {
        const profile = await actor.getCallerUserProfile();
        if (profile) {
          navigate({ to: getRoleRoute(profile.role) });
          return;
        }
      }
      navigate({ to: "/portal/student" });
    } catch {
      setError("Authentication failed. Please try again.");
      setStep("username");
      setPassword("");
      setToken("");
    } finally {
      setLoading(false);
    }
  };

  const stepConfig = {
    username: {
      icon: <User className="w-5 h-5" />,
      label: "Username",
      type: "text" as const,
      value: username,
      onChange: setUsername,
      ocid: "login.username_input",
    },
    password: {
      icon: <Lock className="w-5 h-5" />,
      label: "Password",
      type: "password" as const,
      value: password,
      onChange: setPassword,
      ocid: "login.password_input",
    },
    token: {
      icon: <Key className="w-5 h-5" />,
      label: "Security Token",
      type: "text" as const,
      value: token,
      onChange: setToken,
      ocid: "login.token_input",
    },
  };

  const current = step !== "fingerprint" ? stepConfig[step] : null;

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-background overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.74 0.13 84 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.13 84 / 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="relative z-10 w-full max-w-sm px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-sm"
            style={{
              background: "oklch(0.17 0.15 264)",
              border: "1px solid oklch(0.74 0.13 84 / 0.4)",
            }}
          >
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl text-primary tracking-wide">
            Secure Access
          </h1>
          <p className="text-muted-foreground text-xs mt-1 tracking-wider uppercase">
            RPS International School
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {["Username", "Password", "Token", "Device"].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < stepIndex
                    ? "bg-primary text-primary-foreground"
                    : i === stepIndex
                      ? "border-2 border-primary text-primary"
                      : "border border-border text-muted-foreground"
                }`}
              >
                {i < stepIndex ? "✓" : i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`h-px flex-1 ${i < stepIndex ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === "fingerprint" ? (
            <motion.div
              key="fingerprint"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-6"
              data-ocid="login.loading_state"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  border: "2px solid oklch(0.74 0.13 84)",
                  boxShadow: "0 0 30px oklch(0.74 0.13 84 / 0.3)",
                }}
              >
                <Fingerprint className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <p className="text-primary font-medium text-sm">
                Verifying device fingerprint...
              </p>
              <p className="text-muted-foreground text-xs">Please wait</p>
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin mt-2" />
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {current && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <span className="text-primary">{current.icon}</span>
                      {current.label}
                    </Label>
                    <Input
                      type={current.type}
                      value={current.value}
                      onChange={(e) => current.onChange(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      className="bg-input border-primary text-foreground h-11"
                      autoFocus
                      data-ocid={current.ocid}
                    />
                  </div>
                  {error && (
                    <div
                      className="text-sm text-red-400 border border-destructive/50 bg-destructive/10 px-3 py-2 rounded-sm"
                      data-ocid="login.error_state"
                    >
                      {error}
                    </div>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-semibold tracking-wider uppercase text-sm"
                    data-ocid="login.submit_button"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                  {step !== "username" && (
                    <button
                      type="button"
                      onClick={() => {
                        setStep(step === "token" ? "password" : "username");
                        setError(null);
                      }}
                      className="w-full text-xs text-muted-foreground hover:text-primary text-center transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
