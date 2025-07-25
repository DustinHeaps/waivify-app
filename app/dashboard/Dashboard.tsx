"use client";

import { useEffect, useMemo, useState } from "react";
import WaiverTable from "./components/WaiverTable";
import { useFilteredWaivers } from "./hooks/useFilteredWaivers";
import { Waiver } from "@/types";
import WeeklyCount from "./components/WeeklyCount";
import { FaClipboardList } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  archiveWaivers,
  deleteWaivers,
  getAllWaiversByUser,
  saveWaiver,
} from "../actions/waiver";
import Pagination from "./components/Pagination";
import { Filters } from "./components/Filters";
import { downloadCSV } from "@/lib/utils";
import { LockedFeature } from "./components/LockedFeature";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { uploadSignature } from "../actions/signature";

type Props = {
  waivers: Waiver[];
  user: User;
  // plan: string;
};

const ITEMS_PER_PAGE = 10;

export default function Dashboard({ waivers, user }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [waiverList, setWaiverList] = useState(waivers);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showArchiveSuccess, setShowArchiveSuccess] = useState(false);
  const [showArchiveError, setShowArchiveError] = useState(false);
  const [waiverCount, setWaiverCount] = useState(0);

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewArchived, setViewArchived] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const filteredWaivers = useFilteredWaivers(
    waiverList,
    searchQuery,
    dateFilter
  );

  useEffect(() => {
    if (!user) return;

    const saveDraft = async () => {
      const draft = sessionStorage.getItem("waiverDraft");
      if (!draft) return;

      try {
        const waiverData = JSON.parse(draft);
        const { signature, ...waiverWithoutSignature } = waiverData;
        const newWaiver = await saveWaiver(
          { ...waiverWithoutSignature, userId: user.id },
          user.slug as string
        );

        // Convert base64 to File like in onSubmit
        const blob = await (await fetch(signature)).blob();
        const file = new File([blob], "signature.png", { type: "image/png" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", waiverData.name);
        formData.append("email", waiverData.email);

        const newSignature = await uploadSignature(
          formData,
          newWaiver.id,
          waiverData.date
        );

        sessionStorage.removeItem("waiverDraft");

          setShowBanner(true);
          setTimeout(() => setShowBanner(false), 7500);
        
      } catch (err) {
        console.error("Failed to save waiver:", err);
      }
    };

    saveDraft();
  }, [user]);

  // useEffect(() => {
  //   if (waiverList.length > 0) {
  //     setIsLoading(false);
  //   }
  // }, [waiverList]);

  const totalPages = Math.ceil(waiverList.length / ITEMS_PER_PAGE);

  const currentWaivers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredWaivers.slice(start, start + ITEMS_PER_PAGE);
  }, [page, filteredWaivers]);

  useEffect(() => {
    setIsLoading(true);
    const fetchWaivers = async () => {
      const data = await getAllWaiversByUser({ archived: viewArchived });
      setWaiverList(data);
      setIsLoading(false);
    };

    fetchWaivers();
  }, [viewArchived]);

  const handleArchive = async (ids: string[], clearSelection: () => void) => {
    const previousList = [...filteredWaivers];

    try {
      // Server-side archive first
      const res = await archiveWaivers(ids, viewArchived);

      if (!res?.success) {
        throw new Error("Archive failed");
      }

      // ✅ Optimistic UI (only if archive didn't throw)
      setWaiverList((prev) => prev.filter((w) => !ids.includes(w.id)));
      setShowArchiveSuccess(true);
      setWaiverCount(ids.length);

      setTimeout(() => setShowArchiveSuccess(false), 2500);
    } catch (err) {
      // Rollback UI if the archive fails
      console.error("Failed to archive waiver:", err);
      setWaiverList(previousList);
      setShowArchiveError(true);
      setWaiverCount(0);
      setTimeout(() => setShowArchiveError(false), 3000);
    } finally {
      clearSelection();
    }
  };

  const handleDelete = async (ids: string[]) => {
    const previousList = [...waiverList];

    try {
      // Server-side deletion first
      const res = await deleteWaivers(ids);

      if (!res?.success) {
        throw new Error("Delete failed");
      }

      // ✅ Optimistic UI (only if delete didn't throw)
      setWaiverList((prev) => prev.filter((w) => !ids.includes(w.id)));
      setShowSuccess(true);
      setWaiverCount(ids.length);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to delete waiver:", err);
      // Rollback UI if the deletion fails
      setWaiverList(previousList);
      setShowError(true);
      setWaiverCount(0);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className='max-w-5xl mx-auto mt-10'>
      <div className='mb-6'>
        <Link href='/dashboard/analytics'>
          <span className='mt-2 md:mt-0 text-sm text-blue-600 hover:underline hover:opacity-80 transition cursor-pointer'>
            View Analytics →
          </span>
        </Link>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Your Waivify Submissions
        </h1>
        <p className='text-sm text-gray-500 mt-1'>
          Collect. Confirm. Keep it simple.
        </p>

        {showBanner && (
          <Link href='/home'>
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className='mt-4 mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800'
            >
              <span>✅ Your demo waiver has been saved! Go to Home →</span>
            </motion.div>
          </Link>
        )}
      </div>

      <div className='mt-4 flex gap-2'>
        <button
          onClick={() => setViewArchived(false)}
          className={`px-3 py-1.5 rounded text-sm border ${
            !viewArchived
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setViewArchived(true)}
          className={`px-3 py-1.5 rounded text-sm border ${
            viewArchived
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          Archived
        </button>
      </div>
      <motion.div
        className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <LockedFeature plan={user.plan as "free" | "starter" | "pro"}>
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </LockedFeature>
        <div className='flex justify-end mb-2'>
          <LockedFeature plan={user.plan as "free" | "starter" | "pro"}>
            <button
              onClick={() => downloadCSV(waiverList)}
              className='text-sm text-nowrap text-blue-600 hover:underline self-end sm:self-auto'
            >
              Export all as CSV
            </button>
          </LockedFeature>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className='flex items-center gap-2 text-green-600 text-sm mb-4'
          >
            <span>✅</span>
            <span></span>
          </motion.div>
        )}

        {showArchiveSuccess && (
          <motion.div className='text-blue-600 text-sm mb-4 flex items-center gap-2'>
            <span>📦</span>
            <span>
              {waiverCount === 1
                ? `Waiver ${viewArchived ? "unarchived" : "archived"} successfully.`
                : `${waiverCount} waivers ${viewArchived ? "unarchived" : "archived"} successfully.`}
            </span>
          </motion.div>
        )}
        {showError && (
          <p className='text-red-600 text-sm mt-2'>
            ❌ Failed to delete waiver. Please try again.
          </p>
        )}
        {showArchiveError && (
          <p className='text-red-600 text-sm mt-2'>
            ❌ Failed to {viewArchived ? "unarchive" : "archive"} waiver. Please
            try again.
          </p>
        )}
      </AnimatePresence>

      <motion.div
        key={
          waiverList.length === 0
            ? "no-waivers"
            : filteredWaivers.length === 0
              ? "no-filtered"
              : "show-table"
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          {isLoading ? null : waiverList.length === 0 ? (
            <motion.div
              className='text-center bg-gray-50 p-6 rounded-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaClipboardList
                className='mx-auto text-gray-400 mb-4'
                size={48}
              />
              <p className='text-lg font-medium text-gray-500'>
                {viewArchived
                  ? "No archived waivers yet."
                  : "No waivers match your filters."}
              </p>
            </motion.div>
          ) : filteredWaivers.length === 0 ? (
            <div className='text-center bg-gray-50 p-6 rounded-lg'>
              <p className='text-lg font-medium text-gray-500'></p>
            </div>
          ) : (
            <div>
              <WaiverTable
                waivers={currentWaivers}
                onDelete={handleDelete}
                onArchive={handleArchive}
                isLoading={isLoading}
                viewArchived={viewArchived}
                plan={user.plan}
              />

              {totalPages > 1 && (
                <div className='mt-4 flex justify-center'>
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
