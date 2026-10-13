import { BlogEditor } from "@/components/blog/BlogEditor";
import { PageHeader } from "@/components/shared/PageHeader";

export default function CreateBlogPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader
        title="Create Blog"
        subtitle="Write and publish a new health article."
      />
      <BlogEditor mode="create" />
    </div>
  );
}