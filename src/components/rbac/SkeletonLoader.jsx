import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] p-8 md:p-12 space-y-8 animate-pulse text-left">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-[#2E1E17]/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-48" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-24 h-8 bg-gray-200 rounded-xl" />
          <div className="w-20 h-8 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Main Card Skeleton */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#2E1E17]/5 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-4/5" />
            </div>
            <div className="h-40 bg-gray-100 rounded-2xl w-full mt-4" />
          </div>

          {/* List Card Skeleton */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#2E1E17]/5 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-1/4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-2.5 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 border border-[#2E1E17]/5 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-28 bg-gray-100 rounded-2xl w-full" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
