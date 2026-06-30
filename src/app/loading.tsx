import Image from "next/image";
import { SITE } from "@/content/site";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Image
        src="/assets/bear-yellow.png"
        alt={`A carregar ${SITE.name}`}
        width={56}
        height={56}
        className="animate-pulse"
        priority
      />
    </div>
  );
}
