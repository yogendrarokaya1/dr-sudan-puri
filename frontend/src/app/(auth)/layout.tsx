import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* ── Left Panel ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
            <Stethoscope size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white">Dr. Sudan Puri</p>
            <p className="text-xs text-blue-200">General Practitioner</p>
          </div>
        </Link>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Your Health is Our
            <br />
            <span className="text-accent">Priority</span>
          </h2>
          <p className="text-blue-200 leading-relaxed">
            ECFMG Certified & DHA Licensed General Practitioner with years of
            experience in comprehensive patient care.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Experience", value: "5+ Years" },
              { label: "Certification", value: "ECFMG" },
              { label: "License", value: "DHA" },
              { label: "Location", value: "Dubai, UAE" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 rounded-sm p-4 space-y-1"
              >
                <p className="text-xs text-blue-200">{item.label}</p>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-blue-300">
          © {new Date().getFullYear()} Dr. Sudan Puri. All rights reserved.
        </p>
      </div>

      {/* ── Right Panel ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <p className="font-bold text-primary">Dr. Sudan Puri</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}