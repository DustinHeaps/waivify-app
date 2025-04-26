type Props = {
  plan: "free" | "starter" | "pro";
};

export const Tips = ({ plan }: Props) => {
  const isPro = plan === "pro";

  return (
    <div className='rounded-lg border bg-white p-5 space-y-2'>
      <h2 className='text-sm font-medium text-muted-foreground'>
        Tips & Recommendations
      </h2>

      {isPro ? (
        // Pro user tips
        <ul className='text-sm space-y-1'>
          <li>📊 Analyze waiver activity to find your peak signing times.</li>
          <li>🗂️ Organize signed waivers by archiving completed records.</li>
          <li>⚙️ Export your waivers anytime as a CSV for easy backups.</li>
        </ul>
      ) : (
        // Free/Starter user tips
        <ul className='text-sm space-y-1'>
          <li>📝 Keep waiver names short and clear for faster searches.</li>
          <li>📂 Archive old waivers to stay organized and clutter-free.</li>
          <li>📥 Export your waivers anytime for easy record-keeping.</li>
        </ul>
      )}
    </div>
  );
};
