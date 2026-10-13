import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";

const experiences = [
  {
    title: "General Practitioner",
    company: "Right Health",
    location: "Al Khail Gate, Dubai, UAE",
    period: "Jul 2024 – Present",
    description:
      "Providing comprehensive primary care services as a General Practitioner at Right Health clinic.",
  },
  {
    title: "Medical Officer",
    company: "Council of Community Health Services",
    location: "Kathmandu, Nepal",
    period: "Apr 2022 – Feb 2024",
    description:
      "Conducted patient consultations, performed minor surgical procedures, led community health campaigns and organized health camps.",
  },
  {
    title: "Medical Officer",
    company: "Pyuthan Hospital",
    location: "Pyuthan, Lumbini, Nepal",
    period: "Jan 2021 – Mar 2022",
    description:
      "Served as Medical Officer with advanced skilled birth attendant responsibilities.",
  },
  {
    title: "Intern",
    company: "Lumbini Medical College",
    location: "Kathmandu, Nepal",
    period: "Nov 2019 – Dec 2020",
    description:
      "Completed internship training across multiple departments of a teaching hospital.",
  },
];

const certifications = [
  { label: "ECFMG Certified", desc: "Educational Commission for Foreign Medical Graduates" },
  { label: "DHA Licensed",    desc: "Dubai Health Authority License" },
  { label: "Advanced SBA",    desc: "Advanced Skilled Birth Attendant" },
  { label: "MBBS",            desc: "Lumbini Medical College & Teaching Hospital" },
];

export const metadata = {
  title: "About — Dr. Sudan Puri",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

      {/* ── Header ───────────────────────────────── */}
      <div className="space-y-6">
        <PageHeader
          title="Dr. Sudan Puri"
          subtitle="General Practitioner | ECFMG Certified | DHA Licensed"
        />
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">ECFMG Certified</Badge>
          <Badge variant="success">DHA Licensed</Badge>
          <Badge variant="default">General Practitioner</Badge>
        </div>
        <p className="text-muted leading-relaxed text-base">
          Dr. Sudan Puri is a dedicated General Practitioner currently based in
          Dubai, UAE. With over 5 years of medical experience across Nepal and
          the UAE, Dr. Puri brings a patient-centered approach to healthcare,
          emphasizing preventive medicine, community health, and evidence-based
          practice.
        </p>
      </div>

      {/* ── Certifications ───────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink dark:text-white flex items-center gap-2">
          <Award size={20} className="text-primary" />
          Certifications & Credentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.label} padding="md" className="space-y-1">
              <p className="font-semibold text-primary">{cert.label}</p>
              <p className="text-sm text-muted">{cert.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Education ────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink dark:text-white flex items-center gap-2">
          <GraduationCap size={20} className="text-primary" />
          Education
        </h2>
        <Card padding="md" className="space-y-2">
          <p className="font-semibold text-ink dark:text-white">
            Bachelor of Medicine, Bachelor of Surgery (MBBS)
          </p>
          <p className="text-sm text-muted">
            Lumbini Medical College & Teaching Hospital
          </p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Calendar size={13} />
            <span>Aug 2014 – Aug 2019</span>
          </div>
        </Card>
      </div>

      {/* ── Experience ───────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-ink dark:text-white flex items-center gap-2">
          <Briefcase size={20} className="text-primary" />
          Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <Card key={i} padding="md" className="space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-ink dark:text-white">
                    {exp.title}
                  </p>
                  <p className="text-sm text-secondary font-medium">
                    {exp.company}
                  </p>
                </div>
                <Badge variant="default" size="sm">
                  {exp.period}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <MapPin size={13} />
                <span>{exp.location}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {exp.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}