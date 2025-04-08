import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDefaultTemplates } from "../actions/template";

export default async function TemplatesPage() {
  const templates = await getDefaultTemplates();
  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Your Templates</h1>
        <Link href='/templates/new'>
          <Button>+ New Template</Button>
        </Link>
      </div>

      {templates.map((template) => (
        <li key={template.id} className='border rounded p-4'>
          <h2 className='text-xl font-semibold'>{template.name}</h2>
          <p className='text-sm text-gray-600'>{template.description}</p>
        </li>
      ))}
      {/* Map through existing templates */}
      {/* <TemplateList /> */}
    </div>
  );
}
