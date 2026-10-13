import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign Up — Dr. Sudan Puri",
};

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">Create account</h1>
        <p className="text-sm text-muted">
          Join to access health articles and chat with Dr. Puri
        </p>
      </div>
      <SignupForm />
    </div>
  );
}