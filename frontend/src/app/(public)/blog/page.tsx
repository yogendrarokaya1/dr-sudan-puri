import { PageHeader } from "@/components/shared/PageHeader";
import { BlogList } from "@/components/blog/BlogList";

export const metadata = {
  title: "Health Blog — Dr. Sudan Puri",
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10">
      <PageHeader
        title="Health Articles"
        subtitle="Evidence-based health articles on nutrition, preventive care, wellness and more — written by Dr. Sudan Puri."
      />
      <BlogList />
    </div>
  );
}