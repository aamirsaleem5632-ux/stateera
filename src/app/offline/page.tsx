import Link from "next/link";
import { WifiOff, Home, Compass } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-[#EADCDD] rounded-3xl p-8 text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF5F5] border border-[#EADCDD] flex items-center justify-center text-[#3B0F18]">
          <WifiOff className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <span className="badge badge-demo text-[10px] font-bold uppercase tracking-wider">
            Offline Mode
          </span>
          <h1 className="text-2xl font-black text-[#1A080C]">
            You are currently offline
          </h1>
          <p className="text-sm text-[#5E4A4E] leading-relaxed">
            StateEra cannot reach the network right now. Reconnect to view live property updates, authentication, and portfolio metrics.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="btn btn-primary flex-1 text-xs inline-flex items-center justify-center gap-1.5">
            <Home className="w-4 h-4" />
            <span>Retry Home</span>
          </Link>
          <Link href="/explore" className="btn btn-secondary flex-1 text-xs inline-flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4" />
            <span>Cached Explore</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
