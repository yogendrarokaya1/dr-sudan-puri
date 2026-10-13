"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe } from "lucide-react";
import { signupSchema, SignupFormData } from "@/lib/validations/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";

export const SignupForm = () => {
  const router = useRouter();
  const { handleSignup, isSubmitting } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
  const { confirmPassword, ...signupData } = data;
  void confirmPassword;
  const result = await handleSignup(signupData);
  if (result.success) {
    setToast({ message: "Account created successfully! Please login.", type: "success" });
    setTimeout(() => router.push("/login"), 1500);
  } else {
    setToast({ message: result.message || "Signup failed", type: "error" });
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <Input
          id="name"
          type="text"
          label="Full Name"
          placeholder="Dr. John Doe"
          leftIcon={<User size={16} />}
          error={errors.name?.message}
          {...register("name")}
        />

        {/* Email */}
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Min 8 chars, upper, lower, number, special"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Confirm Password */}
        <Input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          label="Confirm Password"
          placeholder="Re-enter your password"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Phone */}
        <Input
          id="phone"
          type="tel"
          label="Phone (optional)"
          placeholder="+977 9800000000"
          leftIcon={<Phone size={16} />}
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* Country */}
        <Input
          id="country"
          type="text"
          label="Country (optional)"
          placeholder="Nepal"
          leftIcon={<Globe size={16} />}
          error={errors.country?.message}
          {...register("country")}
        />

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-gray-200">
            Gender (optional)
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("gender")}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-gray-200">
            Blood Group (optional)
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("bloodGroup")}
          >
            <option value="">Select blood group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};