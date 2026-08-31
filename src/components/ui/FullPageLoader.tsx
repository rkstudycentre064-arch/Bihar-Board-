import { Loader2 } from "lucide-react";

export const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <img src="/file_0000000031c081fb9da3fad919ad9f0c.png" alt="BIHAR BOARD" className="h-20 w-auto object-contain mb-4 animate-pulse" width="80" height="80" />
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="mt-4 text-slate-500">Loading your profile...</p>
    </div>
  );
};
