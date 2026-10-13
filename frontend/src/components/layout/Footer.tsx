import Link from "next/link";
import { Stethoscope, Mail, MapPin, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Brand ──────────────────────────────── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/10 rounded-sm flex items-center justify-center">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold leading-tight">Dr. Sudan Puri</p>
                <p className="text-xs text-blue-200 leading-tight">
                  General Practitioner
                </p>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              ECFMG Certified & DHA Licensed General Practitioner based in Dubai,
              dedicated to providing quality healthcare.
            </p>
          </div>

          {/* ── Quick Links ────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home",     href: "/" },
                { label: "About",    href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Blog",     href: "/blog" },
                { label: "Contact",  href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-blue-200">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Al Khail Gate, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Mail size={16} className="shrink-0" />
                <a
                  href="mailto:sudanpuri@example.com"
                  className="hover:text-white transition-colors"
                >
                  sudanpuri@example.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Globe size={16} className="shrink-0" />
                <a
                  href="https://www.linkedin.com/in/sudan-puri-a69979244/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-200">
            © {new Date().getFullYear()} Dr. Sudan Puri. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-blue-200 hover:text-white transition-colors">
              Doctor Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};