"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { resetPasswordSchema, ResetPasswordData } from "@/lib/validations/auth.schema";
import { authApi } from "@/lib/api/auth.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    setIsSubmitting(true);
    try {
      await authApi.resetPassword({ token, newPassword: data.newPassword });
      setToast({ message: "Password reset successfully!", type: "success" });
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setToast({ message: "Invalid or expired token", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">Reset password</h1>
        <p className="text-sm text-muted">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="newPassword"
          type="password"
          label="New Password"
          placeholder="Min 8 chars with upper, lower, number, special"
          leftIcon={<Lock size={16} />}
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter new password"
          leftIcon={<Lock size={16} />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}