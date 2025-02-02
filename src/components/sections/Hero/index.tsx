'use client';

export function HeroSection() {
  return (
    <section className="relative h-screen hero-section">
      {/* Main Hero Content Mask Layer */}
      <div className="w-full h-full flex flex-col items-center justify-center cursor-default absolute bg-primary text-themeSmokyBlack">
        Main Site Mask Content Wrapped in Mask Hover HOC and then Wrapped in Mask Frame HOC
      </div>

      {/* Main Hero Content Original Layer */}
      <div className="w-full h-full flex flex-col items-center justify-center cursor-default">
        Main Site Original Content Not in a Mask Hover HOC and not Wrapped in Mask Frame HOC
      </div>
    </section>
  );
}
