export const Changelog = () => {
  return (
    <div className="rounded-lg border bg-white p-5 space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-medium text-muted-foreground">Changelog</h2>
      <span className="inline-block text-xs rounded bg-green-100 text-green-800 px-2 py-0.5">Updated</span>
    </div>
    <ul className="text-sm space-y-1 leading-relaxed">
      <li>✅ CSV Export Launched</li>
      <li>✍️ Signature Pad upgraded for mobile</li>
      <li>✨ Onboarding flow polish</li>
      <li>🐞 Minor bug fixes & improvements</li>
    </ul>
    {/* future link */}
    {/* <a href="#" className="text-xs text-blue-600 hover:underline">See all updates</a> */}
  </div>
  );
};
