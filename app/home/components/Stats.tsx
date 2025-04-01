import { useRef } from "react";
import { useCountUp } from "react-countup";

export const Stats = () => {
  const countUpRef = useRef(null);

  const signatures = 10;

  useCountUp({
    ref: countUpRef,
    end: signatures,
    duration: 1.5,
  });

  return (
    <div className='rounded-lg border bg-white p-5 space-y-3'>
      <h2 className='text-sm font-medium text-muted-foreground'>Your Stats</h2>
      <ul className='text-sm space-y-1'>
        <li>📄 Total Waivers Created: 10</li>
        <li>✍️ Signatures Collected: 10</li>
        <li>⏰ Last Signed: 2 days ago</li>
      </ul>
    </div>
  );
};
