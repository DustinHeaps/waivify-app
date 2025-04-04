"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteDialogProps {
  waiverIds: string[];
  onConfirm: (ids: string[]) => void;
  children: React.ReactNode;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ConfirmDeleteDialog({
  waiverIds,
  onConfirm,
  setSelectedIds,
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(waiverIds);
    setSelectedIds([]);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-red-600 hover:underline px-0'>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-red-600'>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete {waiverIds.length} waiver
          {waiverIds.length > 1 ? "s" : ""}? This action cannot be undone.
        </p>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
