import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TemplateEditor from '@/components/TemplateEditor'; 
import { getOrCreateUserTemplate } from '@/app/actions/template';

type EditWaiverPageProps = {
  params: Promise<{ token: string }>;
};

export default async function EditWaiverPage({ params }: EditWaiverPageProps) {
  const { token } = await params;

const template = await getOrCreateUserTemplate();


  if (!template) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
     <h1 className="text-xl font-semibold">Edit Waiver Template</h1>

      <TemplateEditor template={template} />
    </div>
  );
}
