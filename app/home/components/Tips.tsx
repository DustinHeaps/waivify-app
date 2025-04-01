export const Tips = () => {
  return (
    <div className='rounded-lg border bg-white p-5 space-y-2'>
      <h2 className='text-sm font-medium text-muted-foreground'>
        Tips & Recommendations
      </h2>
      <ul className='text-sm space-y-1'>
        <li>💡 Did you know you can export signed waivers as CSV?</li>
        <li>⏱ Save time when organizing records.</li>
        <li>
          👉 Learn more in our{" "}
          <a href='#' className='underline hover:text-primary'>
            Help Center
          </a>
          .
        </li>
      </ul>
    </div>
  );
};
