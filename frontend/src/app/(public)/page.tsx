import Link from "next/link";
import { ArrowRight, Stethoscope, BookOpen, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

const features = [
  {
    icon: <Stethoscope size={22} />,
    title: "Expert Medical Advice",
    description:
      "Get insights from an ECFMG certified and DHA licensed General Practitioner with years of experience.",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Health Articles",
    description:
      "Read evidence-based health articles on nutrition, preventive care, wellness and more.",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "Direct Chat",
    description:
      "Sign up and chat directly with Dr. Sudan Puri for personal health guidance.",
  },
  {
    icon: <Shield size={22} />,
    title: "Trusted & Certified",
    description:
      "ECFMG certified, DHA licensed practitioner currently practicing at Right Health, Dubai.",
  },
];

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Certification", value: "ECFMG" },
  { label: "License", value: "DHA" },
  { label: "Location", value: "Dubai" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────── */}
<section className="bg-gradient-to-br from-primary via-[#1e4a87] to-secondary text-white py-24 px-4">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-6">
      <Badge variant="info" size="md">
        🩺 General Practitioner · Dubai, UAE
      </Badge>
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
        Dr. Sudan Puri
        <span className="block text-accent mt-1">
          Your Health Partner
        </span>
      </h1>
      <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
        ECFMG Certified & DHA Licensed General Practitioner dedicated to
        providing quality healthcare and medical education through articles
        and direct consultations.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/blog">
          <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={18} />}>
            Read Health Articles
          </Button>
        </Link>
        <Link href="/contact">
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Get in Touch
          </Button>
        </Link>
      </div>
    </div>

    {/* ── Right: Photo + Stats ─────────────────── */}
    <div className="flex flex-col items-center gap-8">

      {/* Circular Profile Photo */}
      <div className="relative">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/20 scale-110" />
        {/* Middle ring */}
        <div className="absolute inset-0 rounded-full border-4 border-accent/40 scale-105" />
        {/* Photo circle */}
        <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/images/dr-sudan-puri.jpg"
            alt="Dr. Sudan Puri"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        {/* Floating DHA badge */}
        <div className="absolute -bottom-2 -right-2 bg-white text-primary px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-bold">DHA Licensed</span>
        </div>
        {/* Floating ECFMG badge */}
        <div className="absolute -top-2 -left-2 bg-accent text-white px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold">ECFMG Certified</span>
        </div>
      </div>

      {/* Stats below photo */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/10 backdrop-blur-sm rounded-sm p-4 space-y-1 border border-white/20 text-center"
          >
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-blue-200">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ── About Dr. Puri ───────────────────────── */}
      <section className="py-20 px-4 bg-surface dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Photo ──────────────────────────────── */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative border */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-sm" />
                <div className="relative w-80 h-96 rounded-sm overflow-hidden shadow-xl">
                  <Image
                    src="/images/dr-sudan-puri.jpg"
                    alt="Dr. Sudan Puri"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-3 rounded-sm shadow-lg">
                  <p className="text-xs text-blue-200">Currently at</p>
                  <p className="text-sm font-semibold">Right Health, Dubai</p>
                </div>
              </div>
            </div>

            {/* ── Bio ────────────────────────────────── */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="default">About Dr. Puri</Badge>
                <h2 className="text-3xl font-bold text-ink dark:text-white">
                  Dedicated to Your
                  <span className="text-primary"> Well-being</span>
                </h2>
              </div>

              <p className="text-muted leading-relaxed">
                Dr. Sudan Puri is an ECFMG Certified and DHA Licensed General
                Practitioner with over 5 years of experience across Nepal and the
                UAE. Currently practicing at Right Health clinic in Dubai, he
                brings a patient-centered approach to every consultation.
              </p>

              <p className="text-muted leading-relaxed">
                With a strong background in community health advocacy, minor
                surgical procedures, and maternal & child health, Dr. Puri is
                committed to making quality healthcare accessible and
                understandable for everyone.
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "MBBS", desc: "Lumbini Medical College" },
                  { label: "ECFMG", desc: "International Certification" },
                  { label: "DHA", desc: "Dubai Health Authority" },
                  { label: "Adv SBA", desc: "Skilled Birth Attendant" },
                ].map((cred) => (
                  <div
                    key={cred.label}
                    className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-ink dark:text-white">
                        {cred.label}
                      </p>
                      <p className="text-xs text-muted">{cred.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href="/about">
                  <Button variant="primary" size="md">
                    Full Profile
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="md">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-ink dark:text-white">
              What You Can Expect
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              A personal platform built to share medical knowledge and connect
              with patients directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-ink dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-surface dark:bg-gray-950">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-ink dark:text-white">
            Have a Health Question?
          </h2>
          <p className="text-muted text-lg">
            Create a free account and send Dr. Sudan Puri a direct message.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/signup">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                Create Free Account
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More About Dr. Puri
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}