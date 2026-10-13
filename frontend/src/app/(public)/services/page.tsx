import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Stethoscope,
  Heart,
  Baby,
  Users,
  Syringe,
  Activity,
  Cross,
  ClipboardList,
} from "lucide-react";

const services = [
  {
    icon: <Stethoscope size={24} />,
    title: "General Consultation",
    description:
      "Comprehensive outpatient consultations including history-taking, physical examination, diagnosis and treatment planning.",
  },
  {
    icon: <Heart size={24} />,
    title: "Preventive Care",
    description:
      "Proactive health screenings, lifestyle counseling and preventive measures to maintain your long-term health.",
  },
  {
    icon: <Baby size={24} />,
    title: "Maternal & Child Health",
    description:
      "Advanced skilled birth attendant services and pediatric care including childhood vaccination programs.",
  },
  {
    icon: <Users size={24} />,
    title: "Community Health",
    description:
      "Community health advocacy, health camp organization and public health awareness campaigns.",
  },
  {
    icon: <Cross size={24} />,
    title: "Minor Procedures",
    description:
      "Minor surgical procedures including incision and drainage, wound dressings and corn excisions.",
  },
  {
    icon: <Syringe size={24} />,
    title: "Vaccinations",
    description:
      "Administration of vaccines and immunization programs for children and adults.",
  },
  {
    icon: <Activity size={24} />,
    title: "Chronic Disease Management",
    description:
      "Ongoing management and monitoring of chronic conditions like hypertension, diabetes and more.",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Health Education",
    description:
      "Patient education on disease prevention, nutrition, medication adherence and healthy lifestyle choices.",
  },
];

export const metadata = {
  title: "Services — Dr. Sudan Puri",
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      <PageHeader
        title="Services & Expertise"
        subtitle="Comprehensive primary care services delivered with a patient-centered approach."
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.title} hover className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary">
              {service.icon}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-ink dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}