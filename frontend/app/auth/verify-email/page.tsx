"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OTPInput } from "@/components/ui/otp-input";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-account`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ otp }),
        }
      );
      const data = await res.json();

      setIsLoading(false);

      if (data.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your email has been verified",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        toast({
          title: "Error",
          description:
            data.message || "Failed to verify email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to verify email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResend = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success) {
        toast({
          title: "Code Sent!",
          description: "A new verification code has been sent to your email",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send code. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-transparent to-bb-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 flex justify-center"
          >
            <div className="h-16 w-16 rounded-full bg-bb-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-bb-primary to-bb-accent bg-clip-text text-transparent">
                BB
              </span>
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold mb-1">Verify Your Email</h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Enter Code</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                  disabled={isLoading || isSuccess}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-bb-primary hover:bg-bb-primary/90"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Verified!
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-bb-primary hover:text-bb-primary/90"
                  onClick={handleResend}
                  disabled={isLoading || isSuccess}
                >
                  Resend Code
                </Button>
              </div>

              <div className="text-center text-sm mt-6">
                <Link
                  href="/auth/login"
                  className="text-muted-foreground hover:text-bb-primary flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
