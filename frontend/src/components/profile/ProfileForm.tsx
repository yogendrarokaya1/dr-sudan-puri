"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateProfileSchema, UpdateProfileData } from "@/lib/validations/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { IUser } from "@/types";

interface ProfileFormProps {
  user: IUser;
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const { handleUpdateProfile, isSubmitting } = useAuth();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone || "",
      country: user.country || "",
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      medicalHistory: user.medicalHistory || "",
    },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    const result = await handleUpdateProfile(data);
    if (result.success) {
      setToast({ message: "Profile updated successfully!", type: "success" });
    } else {
      setToast({ message: result.message || "Update failed", type: "error" });
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="name"
          label="Full Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          id="phone"
          label="Phone"
          placeholder="+977 9800000000"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          id="country"
          label="Country"
          placeholder="Nepal"
          error={errors.country?.message}
          {...register("country")}
        />

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-gray-200">
            Gender
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
            Blood Group
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

        {/* Medical History */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-gray-200">
            Medical History
          </label>
          <textarea
            rows={4}
            placeholder="Any known allergies, conditions, or relevant medical history..."
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            {...register("medicalHistory")}
          />
          {errors.medicalHistory && (
            <p className="text-xs text-red-500">{errors.medicalHistory.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
        >
          Save Changes
        </Button>
      </form>
    </>
  );
};