"use client";

type AdBannerProps = {
  slot: string;
  format?: "horizontal" | "vertical" | "rectangle";
  className?: string;
};

export default function AdBanner({ slot, format = "horizontal", className = "" }: AdBannerProps) {
  const sizeClasses = {
    horizontal: "h-[90px] w-full max-w-[728px]",
    vertical: "w-[300px] h-[600px]",
    rectangle: "w-[300px] h-[250px]",
  };

  return (
    <div className={`flex items-center justify-center mx-auto ${className}`}>
      <div
        className={`${sizeClasses[format]} bg-card-bg border border-card-border rounded-lg flex items-center justify-center text-muted text-xs`}
        data-ad-slot={slot}
        data-ad-format={format}
      >
        Advertisement
      </div>
    </div>
  );
}
