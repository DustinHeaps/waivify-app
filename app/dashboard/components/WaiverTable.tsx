"use client";

import CopyButton from "./CopyButton";
import { Waiver } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDebounced } from "@/hooks/useDebounced";
import { archiveWaivers } from "@/app/actions/waiver";
import { TableRowSkeleton } from "./TableRowSkeleton";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { LockedFeature } from "./LockedFeature";

type Props = {
  waivers: Waiver[];
  onArchive: (ids: string[], clearSelection: () => void) => void;
  onDelete: (ids: string[]) => void;
  isLoading: boolean;
  viewArchived: boolean;
  plan: string;
};

export default function WaiverTable({
  waivers,
  onDelete,
  isLoading,
  onArchive,
  viewArchived,
  plan,
}: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected = selectedIds.length === waivers.length;
  const debouncedLoading = useDebounced(isLoading, 200);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setSelectedIds([]);
  }, [viewArchived]);

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : waivers.map((w) => w.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className='bg-white shadow rounded-lg overflow-hidden mt-6'>
        {selectedIds.length > 0 && (
          <LockedFeature plan={plan as "free" | "starter" | "pro"}>
            <div className='flex justify-between items-center px-4 py-2 border-b bg-gray-50 text-sm text-gray-700'>
              <span>{selectedIds.length} selected</span>
              <div className='space-x-2'>
                <ConfirmDeleteDialog
                  setSelectedIds={setSelectedIds}
                  waiverIds={selectedIds}
                  onConfirm={onDelete}
                >
                  Delete Selected
                </ConfirmDeleteDialog>

                <button
                  onClick={() =>
                    onArchive(selectedIds, () => setSelectedIds([]))
                  }
                  className='text-gray-600 hover:underline'
                >
                  {viewArchived ? "Unarchive" : "Archive"}
                </button>
              </div>
            </div>
          </LockedFeature>
        )}

        <div className='overflow-x-auto'>
          <table className='w-full table-fixed min-w-[640px]'>
            <thead className='bg-gray-100 text-left text-sm text-gray-600'>
              <tr>
                <th className='px-4 py-3 w-16'>
                  <input
                    type='checkbox'
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className='px-4 py-3 min-w-[120px]'>Name</th>
                <th className='px-4 py-3 w-48'>Date</th>
                <th className='px-4 py-3 min-w-[140px]'>Waiver ID</th>
                <th className='px-4 py-3 w-24'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {debouncedLoading
                ? Array.from({ length: waivers.length }).map((_, idx) => (
                    <TableRowSkeleton key={idx} columns={5} />
                  ))
                : waivers.map((waiver) => (
                    <motion.tr
                      layout
                      key={waiver.id}
                      initial={hasMounted ? false : { opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className='border-t hover:bg-gray-50 transition'
                    >
                      <td className='px-4 py-3'>
                        <input
                          type='checkbox'
                          checked={selectedIds.includes(waiver.id)}
                          onChange={() => toggleSelect(waiver.id)}
                        />
                      </td>
                      <td className='px-4 py-3 text-sm whitespace-nowrap '>
                        {waiver.signature?.name as string || waiver.name as string}
                      </td>
                      <td className='px-4 py-3 text-sm whitespace-nowrap'>
                        {waiver.date
                          ? new Date(waiver.date).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-500 whitespace-nowrap '>
                        <span title={waiver.id}>
                          {waiver.id.slice(0, 4)}...{waiver.id.slice(-4)}
                        </span>
                        <CopyButton
                          text={waiver.id}
                          className='text-blue-600 text-sm hover:underline focus:outline-none ml-2'
                        />
                      </td>

                      <td className='px-4 py-3 space-x-4 text-sm whitespace-nowrap '>
                        <a
                          href={`/waiver/${waiver.token}`}
                          target='_blank'
                          className='text-blue-600 hover:underline'
                        >
                          View
                        </a>
                      </td>
                    </motion.tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
