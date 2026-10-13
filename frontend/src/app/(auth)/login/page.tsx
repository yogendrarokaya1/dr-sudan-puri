import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login — Dr. Sudan Puri",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">Welcome back</h1>
        <p className="text-sm text-muted">
          Sign in to your account to continue
        </p>
      </div>
      <LoginForm />
    </div>
  );
}