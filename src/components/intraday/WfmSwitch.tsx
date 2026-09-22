type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  describedBy?: string;
  labelledBy?: string;
  disabled?: boolean;
};

export default function WfmSwitch({
  checked,
  onChange,
  label,
  describedBy,
  labelledBy,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      className={`pswitch${checked ? " is-on" : ""}`}
      aria-checked={checked}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span className="pswitch__track" aria-hidden="true">
        <span className="pswitch__thumb" />
      </span>
      {labelledBy ? null : <span className="pswitch__text">{label}</span>}
    </button>
  );
}
