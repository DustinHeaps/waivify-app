type Props = {
  plan: "free" | "starter" | "pro";
};

export const Tips = ({ plan }: Props) => {
  const isPro = plan === "pro";

  return (
    <div className='h-full flex flex-col justify-between rounded-lg border bg-white p-6 space-y-4'>
      <div>
        <h2 className='text-base font-semibold text-gray-900'>
          🚀 Tips & Recommendations
        </h2>
        <p className='text-sm text-muted-foreground mt-1'>
          Quick ideas to help you get the most out of Waivify.
        </p>
      </div>

      {isPro ? (
        <ul className='text-sm space-y-2 text-muted-foreground'>
          <li>📊 Analyze waiver activity to find your peak signing times.</li>
          <li>🗂️ Organize signed waivers by archiving completed records.</li>
          <li>⚙️ Export your waivers anytime as a CSV for easy backups.</li>
        </ul>
      ) : (
        <ul className='text-sm space-y-2 text-muted-foreground'>
          <li>📝 Keep waiver names short and clear for faster searches.</li>
          <li>📂 Archive old waivers to stay organized and clutter-free.</li>
          <li>📥 Export your waivers anytime for easy record-keeping.</li>
        </ul>
      )}
    </div>
  );
};
