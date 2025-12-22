'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="card-static p-4">
      <Skeleton className="aspect-video rounded-lg mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function SkeletonMasterCard() {
  return (
    <div className="card-static p-5">
      <div className="flex gap-4">
        <Skeleton className="w-[72px] h-[72px] rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonVideoCard() {
  return (
    <div className="card-static overflow-hidden">
      <Skeleton className="aspect-video" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCourseCard() {
  return (
    <div className="card-static p-4">
      <Skeleton className="w-full h-40 rounded-lg mb-3" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-3" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 md:p-12">
      <div className="max-w-2xl">
        <Skeleton className="h-10 w-3/4 mb-4 bg-white/20" />
        <Skeleton className="h-6 w-full mb-2 bg-white/20" />
        <Skeleton className="h-6 w-2/3 mb-6 bg-white/20" />
        <div className="flex gap-3">
          <Skeleton className="h-12 w-32 rounded-xl bg-white/20" />
          <Skeleton className="h-12 w-32 rounded-xl bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card-static p-4 text-center">
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}
