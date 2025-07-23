import { ReactNode } from "react";
import Head from "next/head";

export const metadata = {
  title: "Waivify Blog",
  description: "Waivers, workflows & wins — made simple.",
  alternates: {
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Waivify Blog RSS'
          href='/blog/rss.xml'
        />
      </Head>
      <main className='min-h-screen bg-muted  text-foreground'>
        {children}
      </main>
    </>
  );
}
