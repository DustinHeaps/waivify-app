import { ReactNode } from 'react';

export default function SlugLayout({ children }: { children: ReactNode }) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <main>{children}</main>
      </div>
    );
  }