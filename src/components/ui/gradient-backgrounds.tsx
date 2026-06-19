import { cn } from "@/lib/utils";

const GRADIENTS = {
  indigo: {
    background:
      "radial-gradient(140% 120% at 50% 38%, #ffffff 52%, #6366f1 100%)",
  },
  amber: {
    backgroundImage:
      "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)",
    backgroundSize: "100% 100%",
  },
  aurora: {
    background: `
      radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
      radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
      radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
      radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
      linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
    `,
  },
  mint: {
    background:
      "linear-gradient(120deg, #C8E6C9 0%, #DCEDC8 20%, #F1F8E9 40%, #FFFDE7 60%, #FFF9C4 80%, #F0F4C3 100%)",
  },
} as const;

export type GradientBackgroundVariant = keyof typeof GRADIENTS;

type GradientBackgroundProps = {
  variant?: GradientBackgroundVariant;
  /** fixed = viewport; absolute = fills positioned parent */
  position?: "fixed" | "absolute";
  className?: string;
};

export function GradientBackground({
  variant = "indigo",
  position = "fixed",
  className,
}: GradientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none inset-0 -z-10",
        position === "fixed" ? "fixed" : "absolute",
        className,
      )}
      style={GRADIENTS[variant]}
    />
  );
}

export default GradientBackground;
