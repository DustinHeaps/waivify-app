import { Skeleton } from "@/components/ui/skeleton";

export const TableRowSkeleton = ({ columns = 5 }: { columns?: number }) => {
  return (
    <tr className='border-t'>
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx} className='px-4 py-3'>
          <Skeleton className='h-4 w-full' />
        </td>
      ))}
    </tr>
  );
};
