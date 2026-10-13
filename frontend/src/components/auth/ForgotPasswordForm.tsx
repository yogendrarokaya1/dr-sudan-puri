"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail } from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordData } from "@/lib/validations/auth.schema";
import { authApi } from "@/lib/api/auth.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";

export const ForgotPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsSubmitting(true);
    try {
      await authApi.forgotPassword(data);
      setIsSuccess(true);
    } catch {
      setToast({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Mail size={28} className="text-green-600" />
        </div>
        <h3 className="font-semibold text-ink dark:text-white">
          Check your email
        </h3>
        <p className="text-sm text-muted">
          If this email exists, a reset link has been sent. Check your inbox.
        </p>
        <Link href="/login" className="text-sm text-secondary hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Send Reset Link
        </Button>

        <p className="text-center text-sm text-muted">
          Remember your password?{" "}
          <Link href="/login" className="text-secondary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};