import { IUser } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/format";
import { Mail, Phone, Globe, Calendar, Droplets, User } from "lucide-react";

interface ProfileCardProps {
  user: IUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="space-y-6">
      {/* ── Avatar + Name ──────────────────────── */}
      <div className="flex items-center gap-4">
        <Avatar
          src={user.profileImage}
          name={user.name}
          size="xl"
        />
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-ink dark:text-white">
            {user.name}
          </h2>
          <Badge variant={user.role === "admin" ? "info" : "default"}>
            {user.role === "admin" ? "Doctor" : "Patient"}
          </Badge>
        </div>
      </div>

      {/* ── Info Grid ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow icon={<Mail size={15} />} label="Email" value={user.email} />
        {user.phone && (
          <InfoRow icon={<Phone size={15} />} label="Phone" value={user.phone} />
        )}
        {user.country && (
          <InfoRow icon={<Globe size={15} />} label="Country" value={user.country} />
        )}
        {user.dateOfBirth && (
          <InfoRow
            icon={<Calendar size={15} />}
            label="Date of Birth"
            value={formatDate(user.dateOfBirth)}
          />
        )}
        {user.gender && (
          <InfoRow
            icon={<User size={15} />}
            label="Gender"
            value={user.gender.replace("-", " ")}
          />
        )}
        {user.bloodGroup && (
          <InfoRow
            icon={<Droplets size={15} />}
            label="Blood Group"
            value={user.bloodGroup}
          />
        )}
      </div>

      {/* ── Medical History ─────────────────────── */}
      {user.medicalHistory && (
        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-ink dark:text-white">
            Medical History
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {user.medicalHistory}
          </p>
        </div>
      )}

      {/* ── Member Since ────────────────────────── */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-muted">
          Member since {formatDate(user.createdAt)}
        </p>
      </div>
    </Card>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <span className="text-muted mt-0.5">{icon}</span>
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-medium text-ink dark:text-white capitalize">
        {value}
      </p>
    </div>
  </div>
);