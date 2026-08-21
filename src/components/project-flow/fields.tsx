"use client";

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url" | "tel";
  autoComplete?: string;
  required?: boolean;
  optionalLabel?: string;
  describedBy?: string;
  error?: string | null;
};

export function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
  optionalLabel,
  describedBy,
  error,
}: TextInputProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optionalLabel ? (
          <>
            {" "}
            <span className="text-secondary">({optionalLabel})</span>
          </>
        ) : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="form-error type-nota" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  describedBy?: string;
  labelledBy?: string;
  maxLength?: number;
};

export function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  describedBy,
  labelledBy,
  maxLength = 2000,
}: TextareaProps) {
  return (
    <div className="field">
      {labelledBy ? null : (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

type DateInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  autoFocus?: boolean;
};

export function todayIsoDate(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DateInput({ id, label, value, onChange, min, autoFocus }: DateInputProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        value={value}
        min={min ?? todayIsoDate()}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
