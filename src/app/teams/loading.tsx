import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#F3F4F6] ${className}`}
    />
  );
}

export default function TeamsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="relative container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
            <Skeleton className="h-8 w-52 rounded-full mb-6" />
            <Skeleton className="h-12 w-80 mb-5" />
            <Skeleton className="h-5 w-[460px] max-w-full mb-2" />
            <Skeleton className="h-5 w-96 max-w-full" />
          </div>
        </div>
      </section>

      {/* Filter pills */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] p-1.5">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </div>

          {/* Team card skeletons — 2x2 grid */}
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-8 md:p-9"
              >
                <div className="flex flex-col gap-5">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2.5 flex-1">
                      <Skeleton className="h-6 w-44" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-7 w-20 rounded-full shrink-0" />
                  </div>

                  {/* Niche tag */}
                  <Skeleton className="h-6 w-36 rounded-full" />

                  {/* Divider */}
                  <div className="h-px w-full bg-[#E5E7EB]" />

                  {/* Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatars */}
                      <div className="flex -space-x-2">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <Skeleton
                            key={j}
                            className="h-9 w-9 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <Skeleton className="h-7 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-[#F9FAFB] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 flex flex-col items-center">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-56" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center flex flex-col items-center"
              >
                <Skeleton className="h-11 w-11 rounded-xl mb-3" />
                <Skeleton className="h-8 w-14 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
