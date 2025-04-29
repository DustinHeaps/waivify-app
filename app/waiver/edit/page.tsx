
import { notFound, redirect } from "next/navigation";
// import TemplateEditor from "@/components/TemplateEditor";
import {
  getAllUserTemplates,
} from "@/app/actions/template";
import { TemplateSelector } from "@/components/TemplateSelector";
import { getUserById } from "@/app/actions/user";
import { User } from "@prisma/client";

type EditWaiverPageProps = {
  params: Promise<{ token: string }>;
};

export default async function EditWaiverPage({ params }: EditWaiverPageProps) {
  const dbUser: User | null = await getUserById();

  if (dbUser?.plan === "free") redirect("/billing");

  const templates = await getAllUserTemplates(dbUser?.id as string);

  const template =
    templates.find((t) => t.id === dbUser?.publicTemplateId) || templates[0];

  if (!template) return notFound();
  if (!dbUser) return notFound();

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
      <h1 className='text-xl font-semibold'>Edit Waiver Template</h1>
      {/* <TemplateEditor user={dbUser} templates={templates} template={template} /> */}
    </div>
  );
}
