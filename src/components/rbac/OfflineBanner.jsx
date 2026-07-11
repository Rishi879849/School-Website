import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    // Bind local network events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Bind custom event dispatched from Axios API client
    const handleCustomOffline = (e) => {
      if (e.detail?.isOffline) {
        setIsOffline(true);
      }
    };
    window.addEventListener('app-offline', handleCustomOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('app-offline', handleCustomOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-slide-down">
      <WifiOff size={16} className="animate-pulse" />
      <span>Lost connection to the DTV School Support ERP network node. Reconnection attempts active...</span>
    </div>
  );
}
