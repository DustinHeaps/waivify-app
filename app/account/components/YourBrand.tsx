import { getDefaultTemplates } from "@/app/actions/template";
import Image from "next/image";
import Link from "next/link";

export function YourBrand({
  logoUrl,
  companyName,
  slug,
  plan,
  templates,
  selectedTemplateId,
  onSelectTemplate,
}: {
  logoUrl?: string;
  companyName?: string;
  slug?: string;
  plan: "free" | "starter" | "pro";
  templates: { id: string; name: string }[];
  selectedTemplateId?: string | null;
  onSelectTemplate?: (id: string) => void;
}) {

  const publicUrl = `https://waivify.com/${slug || ""}`;
  const hasBrand = !!logoUrl && !!companyName;

  return (
    <div className='flex flex-col md:flex-row justify-between items-start gap-6 p-5 border rounded-lg bg-white shadow-sm'>
      <div className='flex-1 space-y-2'>
        <h2 className='text-lg font-semibold'>Your Brand</h2>

        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium overflow-hidden'>
            {logoUrl ? (
              <Image src={logoUrl} alt='Logo' width={48} height={48} />
            ) : (
              "Logo"
            )}
          </div>
          <div>
            <p className='font-semibold'>{companyName || "The Company"}</p>
            <p className='text-sm text-muted-foreground'>
              waivify.com/{slug || "undefined"}
            </p>
          </div>
        </div>
        {templates.length > 0 && onSelectTemplate && (
          <div className='mt-3'>
            <label className='text-sm font-medium text-gray-700 block mb-1'>
              Public Template
            </label>
            <select
              value={selectedTemplateId || ""}
              onChange={(e) => onSelectTemplate(e.target.value)}
              className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
            >
              <option value='' disabled>
                Select a template
              </option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className='flex gap-3 mt-2'>
          <Link
            href={publicUrl}
            target='_blank'
            className='text-sm px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800'
          >
            View Public Waiver
          </Link>
        </div>

        {!hasBrand && (
          <p className='text-xs text-muted-foreground border rounded px-3 py-2 mt-2'>
            Add your logo and company name to unlock a sharable QR code.
          </p>
        )}

        <p className='text-xs text-muted-foreground mt-2'>
          “Powered by Waivify” will be visible to clients.{" "}
          {plan !== "pro" && (
            <Link href='/upgrade' className='text-blue-600 underline'>
              Upgrade to remove
            </Link>
          )}
        </p>
      </div>

      <div className='hidden md:flex items-center flex-col justify-center w-40 h-40 bg-gray-100 rounded'>
        {hasBrand ? (
          <>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${publicUrl}&size=160x160`}
              alt='QR Code'
              width={160}
              height={160}
            />
            <p className='text-xs text-muted-foreground text-center mt-2'>
              Scan to view your waiver
            </p>
          </>
        ) : (
          <p className='text-xs text-muted-foreground text-center px-2'>
            QR code preview will appear here
          </p>
        )}
      </div>
    </div>
  );
}
