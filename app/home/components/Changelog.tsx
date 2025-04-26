export const Changelog = () => {
  return (
    <div className='rounded-lg border bg-white p-5 space-y-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-medium text-muted-foreground'>
          Changelog (April 2025)
        </h2>
        <span className='inline-block text-xs rounded bg-green-100 text-green-800 px-2 py-0.5'>
          Updated
        </span>
      </div>

      <ul className='text-sm space-y-1 leading-relaxed pl-3'>
        <li>🚀 Waivify Launched</li>
        <li>Create waivers</li>
        <li>Collect digital signatures</li>
        <li>View and manage submissions</li>
        <li>Export waivers as CSV</li>
        <li>Mobile-optimized signing experience</li>
      </ul>

      {/* future link */}
      {/* <a href="#" className="text-xs text-blue-600 hover:underline">See all updates</a> */}
    </div>
  );
};
