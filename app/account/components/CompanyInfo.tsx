"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { markStepIfEligible } from "@/lib/utils";
// import { SaveButton } from "./SaveButton";
// import { uploadFile } from "@/app/actions/account";

export default function CompanyInfo() {
  const { user } = useUser();
  const [name, setName] = useState<string>(
    (user?.publicMetadata?.companyName as string) || ""
  );
  const [logo, setLogo] = useState<string>(
    (user?.publicMetadata?.logo as string) || ""
  );
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "uploading"
  >("idle");

  useEffect(() => {
    if (user) {
      const meta = user.publicMetadata as Record<string, any>;
      setName(meta.companyName || "");
      setLogo(meta.logoUrl || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setStatus("saving");
    startTransition(async () => {
      try {
        debugger;
        // await SaveButton({ name, logo });

        // auto mark step if they saved company info
        if (name.trim() || logo.trim()) {
          // await markStepIfEligible("5");
        }

        setStatus("saved");
      } catch (err) {
        setStatus("idle"); 
      }
    });
  };

  return (
    <div className='border rounded-lg p-4 space-y-4 bg-white'>
      <h3 className='text-sm font-semibold'>Company Info</h3>
      <p className='text-sm text-muted-foreground'>
        Setup your brand details to personalize waivers.
      </p>

      <div className='space-y-2'>
        <div>
          <label className='block text-xs mb-1'>Company Name</label>
          {/* <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setStatus("idle");
            }}
            placeholder='Your company name'
          /> */}
        </div>

        <div>
          <label className='block text-xs mb-1'>Logo Upload (optional)</label>
          <input
            type='file'
            accept='image/*'
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              setStatus("uploading");

              try {
                // const url = await uploadFile(formData);
                // setLogo(url);
              } catch (err) {
                console.error("Upload failed", err);
              } finally {
                setStatus("idle");
              }
            }}
          />

          {logo && (
            <img
              src={logo}
              alt='Logo preview'
              className='mt-2 w-24 h-24 object-contain rounded bg-gray-100'
            />
          )}
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Button onClick={handleSave} disabled={isPending}>
          Save Info
        </Button>
        {status === "saving" && (
          <span className='text-sm text-muted-foreground'>Saving...</span>
        )}
        {status === "uploading" && (
          <span className='text-sm text-muted-foreground'>Uploading...</span>
        )}
        {status === "saved" && (
          <span className='text-sm text-green-600'>Saved</span>
        )}
      </div>
    </div>
  );
}
