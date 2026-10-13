"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginSchema, LoginFormData } from "@/lib/validations/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";

export const LoginForm = () => {
  const router = useRouter();
  const { handleLogin, isSubmitting } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await handleLogin(data);
    if (result.success) {
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => router.push("/"), 1000);
    } else {
      setToast({ message: result.message || "Login failed", type: "error" });
    }
  };

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

        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted hover:text-primary"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-secondary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-secondary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};