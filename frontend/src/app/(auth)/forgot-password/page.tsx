import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password — Dr. Sudan Puri",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">Forgot password?</h1>
        <p className="text-sm text-muted">
          Enter your email and we will send you a reset link
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}