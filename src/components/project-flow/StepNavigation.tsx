"use client";

type StepNavigationProps = {
  backLabel: string;
  continueLabel: string;
  onBack?: () => void;
  onContinue?: () => void;
  continueDisabled?: boolean;
  continueType?: "button" | "submit";
  sticky?: boolean;
};

export function StepNavigation({
  backLabel,
  continueLabel,
  onBack,
  onContinue,
  continueDisabled,
  continueType = "button",
  sticky = true,
}: StepNavigationProps) {
  return (
    <div className={`step-nav${sticky ? " step-nav--sticky" : ""}`}>
      {onBack ? (
        <button type="button" className="step-nav__back type-corpo" onClick={onBack}>
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {onContinue || continueType === "submit" ? (
        <button
          type={continueType}
          className="form-submit"
          onClick={continueType === "button" ? onContinue : undefined}
          disabled={continueDisabled}
        >
          {continueLabel}
        </button>
      ) : null}
    </div>
  );
}
