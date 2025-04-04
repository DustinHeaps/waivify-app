"use client";

import { useEffect, useMemo, useState } from "react";
import WaiverTable from "./components/WaiverTable";
import { useFilteredWaivers } from "./hooks/useFilteredWaivers";
import { Waiver } from "@/types";
import WeeklyCount from "./components/WeeklyCount";
import { FaClipboardList } from "react-icons/fa";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";
import { deleteWaivers } from "../actions/waiver";
import Pagination from "./components/Pagination";
import { Filters } from "./components/Filters";
import { downloadCSV } from "@/lib/utils";

type Props = {
  waivers: Waiver[];
};

const ITEMS_PER_PAGE = 5;

export default function Dashboard({ waivers }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [waiverList, setWaiverList] = useState(waivers);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const filteredWaivers = useFilteredWaivers(
    waiverList,
    searchQuery,
    dateFilter
  );

  useEffect(() => {
    if (waivers.length > 0) {
      setIsLoading(false);
    }
  }, [waivers]);

  const totalPages = Math.ceil(waivers.length / ITEMS_PER_PAGE);

  const currentWaivers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return waivers.slice(start, start + ITEMS_PER_PAGE);
  }, [page, waivers]);

  const handleDelete = async (ids: string[]) => {
    const previousList = [...waiverList];
    debugger
    try {
      // Server-side deletion first
      const res = await deleteWaivers(ids);

      if (!res?.success) {
        throw new Error("Delete failed");
      }

      // ✅ Optimistic UI (only if delete didn't throw)
      setWaiverList((prev) => prev.filter((w) => !ids.includes(w.id))); 
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to delete waiver:", err);
      // Rollback UI if the deletion fails
      setWaiverList(previousList);
      setShowError(true); // you can animate or display an error
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className='max-w-5xl mx-auto mt-10'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Your Waivify Submissions
        </h1>
        <p className='text-sm text-gray-500 mt-1'>
          Collect. Confirm. Keep it simple.
        </p>
      </div>
      <motion.div
        className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        <div className='flex justify-end mb-2'>
          <button
            onClick={() => downloadCSV(waiverList)}
            className='text-sm text-blue-600 hover:underline self-start sm:self-auto'
          >
            Export all as CSV
          </button>
        </div>
        {/* <WeeklyCount waivers={waivers} /> */}
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
            <span>Waiver deleted successfully.</span>
          </motion.div>
        )}
        {showError && (
          <p className='text-red-600 text-sm mt-2'>
            ❌ Failed to delete waiver. Please try again.
          </p>
        )}
      </AnimatePresence>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={
            waivers.length === 0
              ? "no-waivers"
              : filteredWaivers.length === 0
                ? "no-filtered"
                : "show-table"
          }
          classNames='fade'
          timeout={300}
          unmountOnExit
        >
          <>
            {waivers.length === 0 ? (
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
                  You haven’t submitted any waivers yet.
                </p>
                <a
                  href='/waiver'
                  className='inline-block mt-2 text-blue-600 hover:underline text-sm'
                >
                  Submit a waiver →
                </a>
              </motion.div>
            ) : filteredWaivers.length === 0 ? (
              <div className='text-center bg-gray-50 p-6 rounded-lg'>
                <p className='text-lg font-medium text-gray-500'>
                  No waivers match your filters.
                </p>
              </div>
            ) : (
              <>
                <WaiverTable
                  waivers={currentWaivers}
                  onDelete={handleDelete}
                  isLoading={isLoading}
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
              </>
            )}
          </>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
