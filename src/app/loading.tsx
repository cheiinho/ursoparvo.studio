import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Image
        src="/assets/bear-yellow.png"
        alt="Loading UrsoParvo Studio"
        width={56}
        height={56}
        className="animate-pulse"
        priority
      />
    </div>
  );
}
