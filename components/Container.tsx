import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1750px] mx-auto bg-zinc-100 px-4 border-l border-r border-gray-400  min-h-screen sm:px-6 lg:px-8 relative">
      {children}
    </div>
  );
}
