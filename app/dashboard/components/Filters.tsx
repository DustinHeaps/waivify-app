"use client"; // 🔥 This tells Next.js it's a client component

export function Filters({
  searchQuery,
  setSearchQuery,
  dateFilter,
  setDateFilter,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  dateFilter: string;
  setDateFilter: (val: string) => void;
}) {
  return (
    <div className='flex flex-1 gap-2'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search by name or ID'
        className='w-full border rounded px-3 py-2 text-sm'
      />

      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className='border px-2 py-1 rounded'
      >
        <option value='all'>All Time</option>
        <option value='7days'>Last 7 Days</option>
        <option value='month'>This Month</option>
      </select>
    </div>
  );
}
