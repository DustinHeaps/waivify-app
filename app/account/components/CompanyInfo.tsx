"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SaveButton } from "./SaveButton";
import { uploadFile } from "@/app/actions/account";
import { getUserById } from "@/app/actions/user";
import { Label } from "@/components/ui/label";

export default function CompanyInfo({
  companyName,
  logoUrl,
  onChange,
}: {
  companyName: string;
  logoUrl: string;
  onChange: (name: string, logo: string, slug: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "uploading"
  >("idle");

  useEffect(() => {
    if (user?.id) {
      startTransition(async () => {
        const dbUser = await getUserById();
        if (dbUser) {
          setName(dbUser.companyName || "");
          setLogo(dbUser.logoUrl || "");
        }
      });
    }
  }, [user?.id]);

  const handleSave = async () => {
    setStatus("saving");
    await SaveButton({ name, logo });
    const slug = name
    onChange(name, logo, slug );
    setStatus("saved");
  };



  return (
    <div className='border rounded-lg p-4 space-y-4 bg-white'>
      <h3 className='text-sm font-semibold'>Company Info</h3>
      <p className='text-sm text-muted-foreground'>
        Customize how your brand appears on public waivers. This info shows up
        on your share link and confirmation emails.
      </p>

      <div className='space-y-2'>
        <div>
          <Label htmlFor='companyName' className='text-sm font-medium'>
            Company Name
          </Label>
          <Input
            id='companyName'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setStatus("idle");
            }}
            placeholder='Your company name'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='logo' className='text-sm font-medium'>
            Logo Upload
          </Label>
          <input
            type='file'
            accept='image/*'
            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
            file:rounded file:border-0 file:text-sm file:font-semibold 
            file:bg-gray-100 file:text-gray-700 
            hover:file:bg-gray-200'
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              setStatus("uploading");

              try {
                const url = await uploadFile(formData);
                setLogo(url);
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
