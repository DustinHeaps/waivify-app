export const Links = () => {
  return (
    <div className='rounded-lg border bg-white p-5 space-y-2'>
      <h2 className='text-sm font-medium text-muted-foreground'>
        Helpful Resources
      </h2>
      <ul className='text-sm space-y-1 text-navy'>
        <li>
          <a href='/features' className='hover:underline'>
            Features
          </a>
        </li>
        <li>
          <a href='/pricing' className='hover:underline'>
            Pricing
          </a>
        </li>
        <li>
          <a href='/faq' className='hover:underline'>
            FAQ
          </a>
        </li>
        <li>
          <a href='/support' className='hover:underline'>
            Support
          </a>
        </li>
      </ul>
    </div>
  );
};
